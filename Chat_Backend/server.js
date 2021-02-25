const { text } = require("express");
const serverless = require("serverless-http")
var app = require("express")();
var http = require("http").createServer(app);
const PORT = 8080;
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

var STATIC_CHANNELS = [{
  name: 'Global chat',
  participants: 0,
  id: 1,
  sockets: []
}, {
  name: 'Funny',
  participants: 0,
  id: 2,
  sockets: []
}];

// var CHAT_MEMBERS = [{name:"sojol", participants:2, socketID:123123}, {name:"pratush", participants:2, socketID:34243}];
var CHAT_MEMBERS = [];

// var MESSAGES = [{text:"hello", id:1, senderName:"sojol"}, {text:"something", id:2, senderName:"pratush"}];
var MESSAGES = [];

// app.configure(function(){
//   app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     return next();
//   });

    
app.get("/getChannels", (req,res)=>{
  console.log("chat members :" , CHAT_MEMBERS)  
  res.setHeader("Access-Control-Allow-Origin","*")
  res.json({
    channels: CHAT_MEMBERS
  })
})

http.listen(PORT,  () => {
  console.log(`listening on *:${PORT}`);

});

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log("new client connected");
  
  socket.emit("connection", null) // socket.emit can send messages to the newly connected client, not to all connected clients
  
  
  socket.on("channel-join", id=>{
    console.log("channel join id: ", id);
    STATIC_CHANNELS.forEach(c =>{
      if(c.id === id){
        if(c.sockets.indexOf(socket.id) == (-1)){
          console.log("Participants ++ : ", c.name)
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      }
      else{
        let index = c.sockets.indexOf(socket.id);
        if(index != -1){
          console.log("Participants -- : ", c.name)
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c)
        }
      }
    })
    return id;
  })


  socket.on("add-user", (username, socketId)=>{
    console.log(username, " received in backend")
    console.log("socket id: ",socketId )
    var chat_participants = CHAT_MEMBERS.length+1;
    const newUser = {
      name: username,
      participants: chat_participants,
      id: socketId
    }
    CHAT_MEMBERS.push(newUser)
    CHAT_MEMBERS.forEach(m=>{
      m.participants = chat_participants
    })
    io.emit("members-update", CHAT_MEMBERS)
  })


  socket.on("send-message", (text, id, senderName)=>{
    const newMessage = {
      text: text,
      id: id,
      senderName: senderName
    }
    MESSAGES.push(newMessage)
    io.emit("messages-update", MESSAGES)
  })
});


module.exports.handler = serverless(app)
