const cron = require("node-cron");
const axios = require("axios");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("antrianPrint", (data) => {
      if (!socket.rooms.has("printer")) {
        socket.join("printer");
      }
      io.to("printer").emit("printAntrian", data);
      socket.emit("printAntrian", data);
    });
  });

  process.env.TZ = "Asia/Jakarta";

  cron.schedule("0 0 0 * * *", async () => {
    try {
      await axios.delete("http://127.0.0.1:5000/api/antrian/reset");
      io.emit("queueReset");
    } catch (error) {
      console.error(
        "❌ Error mereset antrian database:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  });
};
