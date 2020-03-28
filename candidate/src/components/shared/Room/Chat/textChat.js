import {sendToServer} from './webSocket'

export default function textChat(connection,myUsername,targetUsername){
  window.addEventListener('load',() => {
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
          chatRecorder.innerHTML += `<p>[${timeStr}]${msg.name}:${msg.text}</p>`;
          chatRecorder.scrollTop = chatRecorder.scrollHeight - chatRecorder.clientHeight;
          break
      }
    }
    textInput.onkeydown = (evt)=>{
      if (evt.keyCode === 13 || evt.keyCode === 14) {
        const msg = {
          text: evt.target.value,
          type: "message",
          name: myUsername,
          // target: targetUsername,
          date: Date.now(),
        };
        sendToServer(msg);
        evt.target.value = "";
      }
    }
  })
}