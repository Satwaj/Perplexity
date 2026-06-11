import {io} from "socket.io-client";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

let persistentSocket = null;

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

// Persistent socket for progress tracking
export const initializeChatSocket = () => {
  if (persistentSocket) {
    return persistentSocket;
  }

  persistentSocket = io(baseURL, {
    withCredentials: true,
  });

  persistentSocket.on("connect", () => {
    console.log("Connected to chat socket with id:", persistentSocket.id);
  });

  persistentSocket.on("error", (error) => {
    console.error("Chat socket error:", error);
  });

  return persistentSocket;
};

export const getChatSocket = () => {
  if (!persistentSocket) {
    return initializeChatSocket();
  }
  return persistentSocket;
};

export const onChatProgress = (callback) => {
  const chatSocket = getChatSocket();
  chatSocket.on("chatProgress", callback);

  // Return unsubscribe function
  return () => {
    chatSocket.off("chatProgress", callback);
  };
};

export const disconnectChatSocket = () => {
  if (persistentSocket) {
    persistentSocket.disconnect();
    persistentSocket = null;
  }
};
