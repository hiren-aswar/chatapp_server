const express = require("express");
var mongoose = require("mongoose");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");  
require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect("mongodb+srv://chat:hviirr72@chat.uswrm.mongodb.net/msgs?retryWrites=true&w=majority");
var msg = require("./Schema.js");
var message = require("./Schematwo.js");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.get("/read",async (req,res)=>{
   const data=await msg.find();
   res.send(data);
})
io.on("connection", async (socket) => {
  
  socket.on("room_taken", async (data) => {
    
    const msgg = new msg({
      room: data.room,
    });
    const result = await msgg.save();
  });

  socket.on("chats", async () => {
    const chats = await msg.find();
    socket.emit("okay", chats);
  });
  socket.on("join_room", (data) => {
    socket.join(data.room);
    socket.emit("image",data.image);
    socket.emit("room_info", data);
  });

  socket.on("sendmsg", async (data) => {
    console.log(data);
    const mes = new message({
      msg: data.msg,
      room: data.room,
      Auther: data.auther,
    });
    const result = await mes.save();
    
  });
  socket.on("recive_msg", async () => {
    var data = await message.find();
  
    socket.emit("done", data);
  });
  socket.on("authername", (data) => {
    socket.emit("chatauther", data);
  });
 
});
const PORT=process.env.PORT
server.listen(process.env.PORT||3001, () => {
  console.log("hello");
});
