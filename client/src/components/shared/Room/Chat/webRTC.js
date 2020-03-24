window.onload = () => {
  // 公共日志函数
  function log(text) {
    var time = new Date();
    console.log("[" + time.toLocaleTimeString() + "] " + text);
  }
  function log_error(text) {
    var time = new Date();
    console.trace("[" + time.toLocaleTimeString() + "] " + text);
  }
  function reportError(errMessage) {
    log_error(`Error ${errMessage.name}: ${errMessage.message}`);
  }

  // webSocket 连接部分
  const myHostname = window.location.hostname||"localhost"
  const scheme = "ws";
  if (document.location.protocol === "https:") {
    scheme += "s";
  }
  let serverUrl = scheme + "://" + myHostname + ":6503";

  let connection = null

  let clientID = 0

   // 通用函数
   function sendToServer(msg) {
    var msgJSON = JSON.stringify(msg);

    log("Sending '" + msg.type + "' message: " + msgJSON);
    connection.send(msgJSON);
  }

  // NOTE:point
  let myUsername = '高13724824476'
  let targetUsername = '张三12345678910'

  // DOM
  const chatRecorder = document.querySelector(".chat_recorder")
  const textInput = document.querySelector(".chat_toolbar>input")

  connect()
  function connect() {
    log(`Connecting to server: ${serverUrl}`)
    connection = new WebSocket(serverUrl, "json")
    connection.onopen = function(evt) {
      console.log('open')
      // document.getElementById("text").disabled = false;
      // document.getElementById("send").disabled = false;
    }
    connection.onerror = function(evt) {
      console.dir(evt)
    }
    connection.onclose = function(evt) {
      console.log('close')
    }
    connection.addEventListener('message',handleTextChatMsg)
    connection.addEventListener('message',handleWebRTCMsg)
  }

  function handleTextChatMsg(evt){
    const msg = JSON.parse(evt.data);
    log("Message received: ");
    console.dir(msg);

    switch(msg.type) {
      case "id":
        clientID = msg.id
        setUsername();
        break
      case "userlist":      // Received an updated user list
        // handleUserlistMsg(msg);
        break
      case 'message':
        const time = new Date(msg.date);
        const timeStr = time.toLocaleTimeString();
        chatRecorder.innerHTML += `<p class='remote'>[${timeStr}]${msg.name}:${msg.text}</p>`;
        chatRecorder.scrollTop = chatRecorder.scrollHeight - chatRecorder.clientHeight;
        chatRecorder.innerHTML += `<p>[${timeStr}]${msg.name}:${msg.text}</p>`;
        chatRecorder.scrollTop = chatRecorder.scrollHeight - chatRecorder.clientHeight;
        break
    }
  }

  function setUsername() {
    sendToServer({
      name: myUsername,
      date: Date.now(),
      id: clientID,
      type: "username"
    });
  }

  function handleUserlistMsg(msg) {
    var i;
    var listElem = document.querySelector(".userlistbox");

    while (listElem.firstChild) {
      listElem.removeChild(listElem.firstChild);
    }

    msg.users.forEach(function(username) {
      var item = document.createElement("li");
      item.appendChild(document.createTextNode(username));
      item.addEventListener("click", invite, false);

      listElem.appendChild(item);
    });
  }

  textInput.onkeydown = handleKey
  function handleKey(evt){
    if (evt.keyCode === 13 || evt.keyCode === 14) {
      const msg = {
        text: textInput.value,
        type: "message",
        name: myUsername,
        // target: targetUsername,
        date: Date.now(),
      };
      sendToServer(msg);
      
      textInput.value = "";
    }
  }



  // NOTE: webRTC Part
  var mediaConstraints = {
    audio: true,            // We want an audio track
    video: {
      aspectRatio: {
        ideal: 1.333333     // 3:2 aspect is preferred
      }
    }
  }

  var myPeerConnection = null;    // RTCPeerConnection
  var transceiver = null;         // RTCRtpTransceiver
  var webcamStream = null;        // MediaStream from webcam
  // DOM
  const inviteBtn = document.getElementById('inviteBtn')
  const localVideo = document.getElementById("localVideo")
  const remoteVideo = document.getElementById("remoteVideo")
  const videoCover = document.getElementById("videoCover")
  const hangUpBtn = document.getElementById("hangUpBtn")

  // toggle函数
  makeHangUpBtnDisabled(true)
  function makeHangUpBtnDisabled(flag){
    if(flag){
      hangUpBtn.style.pointerEvents = 'none'
      hangUpBtn.style.color = '#ccc'
    }
    else{
      hangUpBtn.style.pointerEvents = ''
      hangUpBtn.style.color = ''
    }
  }
  function showVideo(flag){
    if(flag){
      videoCover.style.display = 'none'
      remoteVideo.style.display = 'block'
      localVideo.style.display = 'block'
    }
    else{
      videoCover.style.display = 'flex'
      remoteVideo.style.display = 'none'
      localVideo.style.display = 'none'
    }
  }


  function handleWebRTCMsg(evt){
    const msg = JSON.parse(evt.data);
    log("Message received: ");
    console.dir(msg);
    
    switch(msg.type) {
      // Signaling messages: these messages are used to trade WebRTC
      // signaling information during negotiations leading up to a video
      // call.
      case "video-offer":  // Invitation and offer to chat
        handleVideoOfferMsg(msg);
        break;
    
      case "video-answer":  // Callee has answered our offer
        handleVideoAnswerMsg(msg);
        break;
    
      case "new-ice-candidate": // A new ICE candidate has been received
        handleNewICECandidateMsg(msg);
        break;
    
      case "hang-up": // The other peer has hung up the call
        handleHangUpMsg(msg);
        break;
    }
  }


  inviteBtn.onclick = invite
  async function invite(evt) {

    showVideo(true)

    log("Starting to prepare an invitation");
    if (myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {
      // var clickedUsername = evt.target.textContent;

      // if (clickedUsername === myUsername) {
      //   alert("I'm afraid I can't let you talk to yourself. That would be weird.");
      //   return;
      // }

      log("Inviting user " + targetUsername);

      log("Setting up connection to invite user: " + targetUsername);
      createPeerConnection();

      try {
        webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
        localVideo.srcObject = webcamStream
      } catch(err) {
        handleGetUserMediaError(err)
        return
      }

      try {
        webcamStream.getTracks().forEach(
          transceiver = track => myPeerConnection.addTransceiver(track, {streams: [webcamStream]})
        )
      } catch(err) {
        handleGetUserMediaError(err)
      }
    }
  }

  async function createPeerConnection() {
    log("Setting up a connection...");

    myPeerConnection = new RTCPeerConnection({
      iceServers: [     // Information about ICE servers - Use your own!
        {
          urls: "turn:" + myHostname,  // A TURN server
          username: "webrtc",
          credential: "turnserver"
        }
      ]
    });

    // Set up event handlers for the ICE negotiation process.

    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    myPeerConnection.ontrack = handleTrackEvent;
  }
  // NOTE: Signaling
  async function handleNegotiationNeededEvent() {
    log("*** Negotiation needed");

    try {
      log("---> Creating offer");
      const offer = await myPeerConnection.createOffer();

      if (myPeerConnection.signalingState != "stable") {
        log("     -- The connection isn't stable yet; postponing...")
        return;
      }

      log("---> Setting local description to the offer");
      await myPeerConnection.setLocalDescription(offer);

      log("---> Sending the offer to the remote peer");
      sendToServer({
        name: myUsername,
        target: targetUsername,
        type: "video-offer",
        sdp: myPeerConnection.localDescription
      });
    } catch(err) {
      log("*** The following error occurred while handling the negotiationneeded event:");
      reportError(err);
    };
  }

  async function handleVideoOfferMsg(msg) {
    targetUsername = msg.name;

    log("Received video chat offer from " + targetUsername);
    if (!myPeerConnection) {
      createPeerConnection();
    }

    var desc = new RTCSessionDescription(msg.sdp);

    if (myPeerConnection.signalingState != "stable") {
      log("  - But the signaling state isn't stable, so triggering rollback");

      await Promise.all([
        myPeerConnection.setLocalDescription({type: "rollback"}),
        myPeerConnection.setRemoteDescription(desc)
      ]);
      return;
    } else {
      log ("  - Setting remote description");
      await myPeerConnection.setRemoteDescription(desc);
    }

    if (!webcamStream) {
      try {
        webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      } catch(err) {
        handleGetUserMediaError(err);
        return;
      }

      document.getElementById("local_video").srcObject = webcamStream;

      try {
        webcamStream.getTracks().forEach(
          transceiver = track => myPeerConnection.addTransceiver(track, {streams: [webcamStream]})
        );
      } catch(err) {
        handleGetUserMediaError(err);
      }
    }

    log("---> Creating and sending answer to caller");

    await myPeerConnection.setLocalDescription(await myPeerConnection.createAnswer());

    sendToServer({
      name: myUsername,
      target: targetUsername,
      type: "video-answer",
      sdp: myPeerConnection.localDescription
    });
  }

  async function handleVideoAnswerMsg(msg) {
    log("*** Call recipient has accepted our call");

    var desc = new RTCSessionDescription(msg.sdp);
    await myPeerConnection.setRemoteDescription(desc).catch(reportError);
  }

  async function handleNewICECandidateMsg(msg) {
    var candidate = new RTCIceCandidate(msg.candidate);

    log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
    try {
      await myPeerConnection.addIceCandidate(candidate)
    } catch(err) {
      reportError(err);
    }
  }

  function handleICEGatheringStateChangeEvent(event) {
    log("*** ICE gathering state changed to: " + myPeerConnection.iceGatheringState);
  }

  function handleTrackEvent(event) {
    log("*** Track event");
    remoteVideo.srcObject = event.streams[0];
    makeHangUpBtnDisabled(false)
  }

  function handleICECandidateEvent(event) {
    if (event.candidate) {
      log("*** Outgoing ICE candidate: " + event.candidate.candidate);

      sendToServer({
        type: "new-ice-candidate",
        target: targetUsername,
        candidate: event.candidate
      });
    }
  }

  hangUpBtn.onclick = hangUpCall
  // NOTE:主动挂断
  function hangUpCall() {
    closeVideoCall();

    showVideo(false)
    
    sendToServer({
      name: myUsername,
      target: targetUsername,
      type: "hang-up"
    });
  }

  // 被动挂断
  function handleHangUpMsg(msg) {
    log("*** Received hang up notification from other peer");

    closeVideoCall();
  }

  // 对方断线，自动挂断
  function handleICEConnectionStateChangeEvent(event) {
    log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);

    switch(myPeerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        closeVideoCall();
        break;
    }
  }
  // 对方断线，自动挂断
  function handleSignalingStateChangeEvent(event) {
    log("*** WebRTC signaling state changed to: " + myPeerConnection.signalingState);
    switch(myPeerConnection.signalingState) {
      case "closed":
        closeVideoCall();
        break;
    }
  }

    // 停止视频通信的逻辑
    function closeVideoCall() {

      log("Closing the call");
  
      if (myPeerConnection) {
        log("--> Closing the peer connection");
  
        myPeerConnection.ontrack = null;
        myPeerConnection.onnicecandidate = null;
        myPeerConnection.oniceconnectionstatechange = null;
        myPeerConnection.onsignalingstatechange = null;
        myPeerConnection.onicegatheringstatechange = null;
        myPeerConnection.onnotificationneeded = null;
  
        myPeerConnection.getTransceivers().forEach(transceiver => {
          console.log(transceiver)
          // 这个api已经不可用了，实践证明不用这一步也可以全部停止
          // transceiver.stop()
        });
  
        if (localVideo.srcObject) {
          localVideo.pause();
          localVideo.srcObject.getTracks().forEach(track => {
            track.stop();
          })
        }
  
        myPeerConnection.close();
        myPeerConnection = null;
        webcamStream = null;
      }
  
      makeHangUpBtnDisabled(true)
      targetUsername = null;
    }
  
  function handleGetUserMediaError(e) {
    log_error(e);
    switch(e.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone" +
              "were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        break;
      default:
        alert("Error opening your camera and/or microphone: " + e.message);
        break;
    }

    closeVideoCall();
  }
}