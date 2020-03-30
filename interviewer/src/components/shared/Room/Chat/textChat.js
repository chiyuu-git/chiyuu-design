import {sendToServer} from './webSocket'

// myName用于做DOM显示，targetUsername用于做ws标识
export default function textChat(connection,myName,targetID){
  // DOM
  const chatRecorder = document.querySelector(".chat_recorder")
  const textInput = document.querySelector(".chat_toolbar>input")
  // document.getElementById("text").disabled = false;
  // document.getElementById("send").disabled = false;

  // ws
  connection.addEventListener('message',handleTextChatMsg)

  function handleTextChatMsg(evt){
    const msg = JSON.parse(evt.data);
    switch(msg.type) {
      case 'message':
        const time = new Date(msg.date);
        const timeStr = time.toLocaleTimeString();
        chatRecorder.innerHTML += `<p class='remote'>[${timeStr}]${msg.name}:${msg.text}</p>`;
        chatRecorder.scrollTop = chatRecorder.scrollHeight - chatRecorder.clientHeight;
        break
    }
  }
  textInput.onkeydown = (evt)=>{
    if (evt.keyCode === 13 || evt.keyCode === 14) {
      const msg = {
        text: evt.target.value,
        type: "message",
        name: myName,
        target: targetID,
        date: Date.now(),
      };
      // 本地显示
      const time = new Date(msg.date);
      const timeStr = time.toLocaleTimeString();
      chatRecorder.innerHTML += `<p>[${timeStr}]${myName}:${evt.target.value}</p>`;
      chatRecorder.scrollTop = chatRecorder.scrollHeight - chatRecorder.clientHeight;
      sendToServer(msg);
      evt.target.value = "";
    }
  }
}