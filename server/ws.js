module.exports =  (server) => {
  server.on('open', function open() {
    console.log('ws open');
  });
  
  server.on('close', function close() {
    console.log('ws closed');
  });

  /* NOTE:signaling */

  const connectionArray = [];
  let nextID = Date.now();
  let appendToMakeUnique = 1;
  
  server.on('connection', function(connection,req) {
    /* if (!originIsAllowed(request.origin)) {
      request.reject();
      log("Connection from " + request.origin + " rejected.");
      return;
    } */
    log("Connection accepted from " + req.connection.remoteAddress + ".");
    connectionArray.push(connection);
  
    connection.clientID = nextID;
    nextID++;
  
    // Send the new client its token; it send back a "username" message to
    // tell us what username they want to use.
    const msg = {
      type: "id",
      id: connection.clientID
    };
    connection.send(JSON.stringify(msg));
  
    // 所有收到的消息，仅仅只做转发，逻辑留到客户端处理
    connection.on('message', function(message) {
        log("Received Message: " + message);
        const msg = JSON.parse(message)

        switch(msg.type){
          case 'username':
            getConnectionForID(msg.id).username = msg.name
            // 通知所有客户端更新用户列表
            sendUserListToAll()
            break
          // 默认直接转发
          default:
            if (msg.target 
              && msg.target !== undefined 
              && msg.target.length !== 0) {
              sendToOneUser(msg.target, message);
            } 
            else {
              for (let i=0; i<connectionArray.length; i++) {
                connectionArray[i].send(message);
              }
            }
        }
    })

    connection.addEventListener('close',(e) => {
      // 更新连接列表
      connectionArray.find(function(client,index) {
        if(client === e.target){
          connectionArray.splice(index,1)
          console.log(e.target.username,'is disconnected')
          return true
        }else return false
      })

      console.log(connectionArray.length)
      // 通知客户端更新连接列表
      sendUserListToAll()
    })
  })
  
  function log(text) {
    var time = new Date();
  
    console.log("[" + time.toLocaleTimeString() + "] " + text);
  }
  
  // function originIsAllowed(origin) {
  //   return true;    // We will accept all connections
  // }
  
  function isUsernameUnique(name) {
    var isUnique = true;
    var i;
  
    for (i=0; i<connectionArray.length; i++) {
      if (connectionArray[i].username === name) {
        isUnique = false;
        break;
      }
    }
    return isUnique;
  }
  
  function sendToOneUser(target, msgString) {
    var isUnique = true;
    var i;
  
    for (i=0; i<connectionArray.length; i++) {
      if (connectionArray[i].username === target) {
        connectionArray[i].send(msgString);
        break;
      }
    }
  }
  
  function getConnectionForID(id) {
    var connect = null;
    var i;
  
    for (i=0; i<connectionArray.length; i++) {
      if (connectionArray[i].clientID === id) {
        connect = connectionArray[i];
        break;
      }
    }
  
    return connect;
  }
  
  function makeUserListMessage() {
    var userListMsg = {
      type: "userlist",
      users: []
    };
    var i;
  
    // Add the users to the list
  
    for (i=0; i<connectionArray.length; i++) {
      userListMsg.users.push(connectionArray[i].username);
    }
  
    return userListMsg;
  }
  
  function sendUserListToAll() {
    var userListMsg = makeUserListMessage();
    var userListMsgStr = JSON.stringify(userListMsg);
    var i;
  
    for (i=0; i<connectionArray.length; i++) {
      connectionArray[i].send(userListMsgStr);
    }
  }
}