const db = require("../config/mysqlDB");
const emitQueueUpdate = require("../utils/emitQueueUpdate");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Bergabung ke room berdasarkan jenis antrian
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    // Mengirim pembaruan ke room tertentu
    socket.on("sendQueueUpdate", (data) => {
      const { room, queueNumber } = data;
      console.log(`Queue update triggered: room: ${room}, queueNumber: ${queueNumber}`);
      io.to(room).emit(`queueUpdated-${room}`, { queueNumber });
    });

    // Bersihkan saat client disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Emit queue update saat server dimulai
  emitQueueUpdate(io);
};
