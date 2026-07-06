import {Server} from "socket.io"

let io;

export function initSocket(httpServer){

  io = new Server (httpServer,{
    cors:{
      origin: [
        "http://localhost:5173",
        "https://perplexity-bay.vercel.app",
        "https://perplexity-hm481if51-satwajs-projects.vercel.app"
      ],
      credentials:true
    }
  })

  console.log("Socket.io server is running")

  io.on("connection",(socket)=>{
    console.log("New client connected:"+ socket.id)

    socket.on("disconnect",()=>{
      console.log("Client disconnected:"+ socket.id)
    })
  })
}


export function getIO(){
  if(!io){
    throw new Error("Socket.io not initialized")    
  }

  return io
}