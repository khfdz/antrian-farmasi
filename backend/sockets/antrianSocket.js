const db = require("../config/mysqlDB");
const emitAntrianUpdate = require("../services/emitAntrianUpdate");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    socket.on("sendAntrianUpdate", (data) => {
      const { room, antrianNumber } = data;
      console.log(
        `Antrian update triggered: room: ${room}, antrianNumber: ${antrianNumber}`
      );
      io.to(room).emit(`antrianUpdated-${room}`, { antrianNumber });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  emitAntrianUpdate(io);
};
