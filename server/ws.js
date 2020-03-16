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
    // if (!originIsAllowed(request.origin)) {
    //   request.reject();
    //   log("Connection from " + request.origin + " rejected.");
    //   return;
    // }
  
    // Accept the request and get a connection.
  
    // var connection = request.accept("json", request.origin);
  
    // Add the new connection to our list of connections.
  
    log("Connection accepted from " + req.connection.remoteAddress + ".");
    connectionArray.push(connection);
  
    connection.clientID = nextID;
    nextID++;
  
    // Send the new client its token; it send back a "username" message to
    // tell us what username they want to use.
  
    var msg = {
      type: "id",
      id: connection.clientID
    };
    connection.send(JSON.stringify(msg));
  
    // Set up a handler for the "message" event received over WebSocket. This
    // is a message sent by a client, and may be text to share with other
    // users, a private message (text or signaling) for one user, or a command
    // to the server.
  
    connection.on('message', function(message) {
        log("Received Message: " + message);
  
        // Process incoming data.
  
        var sendToClients = true;
        msg = JSON.parse(message);
        var connect = getConnectionForID(msg.id);
  
        // Take a look at the incoming object and act on it based
        // on its type. Unknown message types are passed through,
        // since they may be used to implement client-side features.
        // Messages with a "target" property are sent only to a user
        // by that name.
  
        switch(msg.type) {
          // Public, textual message
          case "message":
            msg.name = connect.username;
            msg.text = msg.text.replace(/(<([^>]+)>)/ig, "");
            break;
  
          // Username change
          case "username":
            var nameChanged = false;
            var origName = msg.name;
  
            // Ensure the name is unique by appending a number to it
            // if it's not; keep trying that until it works.
            while (!isUsernameUnique(msg.name)) {
              msg.name = origName + appendToMakeUnique;
              appendToMakeUnique++;
              nameChanged = true;
            }
  
            // If the name had to be changed, we send a "rejectusername"
            // message back to the user so they know their name has been
            // altered by the server.
            if (nameChanged) {
              var changeMsg = {
                id: msg.id,
                type: "rejectusername",
                name: msg.name
              };
              connect.send(JSON.stringify(changeMsg));
            }
  
            // Set this connection's final username and send out the
            // updated user list to all users. Yeah, we're sending a full
            // list instead of just updating. It's horribly inefficient
            // but this is a demo. Don't do this in a real app.
            connect.username = msg.name;
            sendUserListToAll();
            sendToClients = false;  // We already sent the proper responses
            break;
        }
  
        // Convert the revised message back to JSON and send it out
        // to the specified client or all clients, as appropriate. We
        // pass through any messages not specifically handled
        // in the select block above. This allows the clients to
        // exchange signaling and other control objects unimpeded.
  
        if (sendToClients) {
          var msgString = JSON.stringify(msg);
          var i;
  
          // If the message specifies a target username, only send the
          // message to them. Otherwise, send it to every user.
          if (msg.target && msg.target !== undefined && msg.target.length !== 0) {
            sendToOneUser(msg.target, msgString);
          } else {
            for (i=0; i<connectionArray.length; i++) {
              connectionArray[i].send(msgString);
            }
          }
        }
    });
    // Handle the WebSocket "close" event; this means a user has logged off
    // or has been disconnected.
    connection.addEventListener('close',(e) => {
        // First, remove the connection from the list of connections.
      // connectionArray = connectionArray.filter(function(el, idx, ar) {
      //   return el.connected;
      // });
      connectionArray.find(function(client,index) {
        if(client === e.target){
          connectionArray.splice(index,1)
          console.log(e.target.username,'is disconnected')
          return true
        }else return false
      })
      console.log(connectionArray.length)
        // Now send the updated user list. Again, please don't do this in a
      // real application. Your users won't like you very much.
      sendUserListToAll()
    })
  });
  
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