// webSocket 连接部分
const myHostname = window.location.hostname||"localhost"
const scheme = "ws";
if (document.location.protocol === "https:") {
  scheme += "s";
}
let serverUrl = scheme + "://" + myHostname + ":6503";

let connection = null

let clientID = 0

export default function wsCreator(myUsername) {
  log(`Connecting to server: ${serverUrl}`)
  connection = new WebSocket(serverUrl, "json")

  connection.onopen = function(evt) {
    console.log('websocket open')
  }
  connection.onerror = function(evt) {
    console.dir(evt)
  }
  connection.onclose = function(evt) {
    console.log('websocket close')
  }

  connection.addEventListener('message',(evt) => {
    const msg = JSON.parse(evt.data);
    log("Message received:");
    console.dir(msg)

    switch(msg.type) {
      case "id":
        clientID = msg.id
        sendToServer({
          name: myUsername,
          date: Date.now(),
          id: clientID,
          type: "username"
        });
        break
      case "userlist":      // Received an updated user list
        // handleUserlistMsg(msg);
        break
    }
  })

  return connection
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


// 公共日志函数
export function log(text) {
  var time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
export function log_error(text) {
  var time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
export function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}

// 通用函数
export function sendToServer(msg) {
var msgJSON = JSON.stringify(msg);

console.log("Sending '" + msg.type + "' message: " + msgJSON);
connection.send(msgJSON);
}