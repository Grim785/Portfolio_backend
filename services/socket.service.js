const { Server } = require("socket.io");

const socketService = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Cấu hình lại nếu muốn bảo mật hơn
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Lưu `io` để dùng trong controller
  return io;
};

module.exports = socketService;
