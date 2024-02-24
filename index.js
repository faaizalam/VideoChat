import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer= createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
 io.on("connection", (socket) => {
  console.log("connected")
    socket.emit('me',socket.id)
    socket.on('disConnect',()=>{
      socket.broadcast.emit("callEnded")
    })
    socket.on('callUser',({userTocall,SignalData,from,name})=>{
      console.log(userTocall,from,name)
      io.to(userTocall).emit('callUser',{Signal:SignalData,from,name})
      
    })
    socket.on("AnswerCall",(data)=>{
      io.to(data.to).emit('callAccepted',data.Signal)

    })
  });
  

const port = 5000;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
