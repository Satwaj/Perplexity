import {io} from "socket.io-client";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const initializeSocketConnection = ()=>{

  const socket = io(baseURL, {
    withCredentials: true,
  })

  socket.on("connect",()=>{
    console.log("Connected to socket server with id:", socket.id)
  })

  socket.on("error", (error) => {
    console.error("Socket error:", error)
  })

  return socket
}

