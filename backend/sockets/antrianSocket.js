const db = require("../config/mysqlDB");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("sendQueueUpdate", ({ section, queueNumber }) => {
      io.to(section).emit("receiveQueueUpdate", { section, queueNumber });
      io.to("printRoom").emit("updatePagePrint", {
        room: section,
        antrianNumber: queueNumber,
      });
    });
  });

  const emitAntrianUpdate = async () => {
    try {
      const [results] = await db.query(
        `SELECT 
          last_no_antrian_bpjs_racikan, 
          last_no_antrian_bpjs_jadi, 
          last_no_antrian_racikan, 
          last_no_antrian_jadi 
         FROM antrian_counter 
         WHERE id = 1`
      );

      const antrianData = {
        "bpjs-obat-racikan": results[0]?.last_no_antrian_bpjs_racikan || 0,
        "bpjs-obat-jadi": results[0]?.last_no_antrian_bpjs_jadi || 0,
        "obat-racikan": results[0]?.last_no_antrian_racikan || 0,
        "obat-jadi": results[0]?.last_no_antrian_jadi || 0,
      };

      Object.entries(antrianData).forEach(([room, antrianNumber]) => {
        io.to(room).emit(`antrianUpdated-${room}`, { antrianNumber });
      });
    } catch (err) {
      console.error("🔥 Error in emitAntrianUpdate:", err);
    }
  };

  emitAntrianUpdate();
};
