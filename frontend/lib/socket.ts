import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  // If socket exists and is connected, return it
  if (socket && socket.connected) {
    return socket;
  }

  // If socket exists but is disconnected, clean it up first
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  // Create new socket instance with correct URL

  let serverUrl: string;
  if (process.env.NODE_ENV === "development")
    serverUrl =
      process.env.NEXT_PUBLIC_DEV_SOCKET_URL || "http://localhost:8000/";
  else
    serverUrl =
      process.env.NEXT_PUBLIC_PROD_SOCKET_URL || "http://localhost:8000/";

  socket = io(serverUrl, {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 20000,
    transports: ["websocket", "polling"], // Fallback to polling if websocket fails
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};

export const isSocketConnected = (): boolean => {
  return socket ? socket.connected : false;
};
