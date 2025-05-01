const { Server } = require("socket.io");

const socketService = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",  // Hoặc frontend URL cụ thể
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });

  return io;
};

module.exports = socketService;
