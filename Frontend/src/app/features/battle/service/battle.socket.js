import { io } from "socket.io-client";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

let socket = null;

export const initializeBattleSocket = () => {
  if (socket) {
    return socket;
  }

  socket = io(baseURL, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to battle socket with id:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Battle socket error:", error);
  });

  return socket;
};

export const getBattleSocket = () => {
  if (!socket) {
    return initializeBattleSocket();
  }
  return socket;
};

export const onBattleProgress = (callback) => {
  const battleSocket = getBattleSocket();
  battleSocket.on("battleProgress", callback);

  // Return unsubscribe function
  return () => {
    battleSocket.off("battleProgress", callback);
  };
};

export const disconnectBattleSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
