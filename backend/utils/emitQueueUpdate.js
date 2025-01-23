const db = require("../config/mysqlDB");

const emitQueueUpdate = (io) => {
  db.query(
    "SELECT last_no_antrian_bpjs_racikan, last_no_antrian_bpjs_jadi, last_no_antrian_racikan, last_no_antrian_jadi FROM antrian_counter WHERE id = 1",
    (err, results) => {
      if (err) {
        console.error("Error fetching queue numbers:", err);
        return;
      }

      const lastNoAntrianBpjsRacikan = results[0]?.last_no_antrian_bpjs_racikan || 0;
      const lastNoAntrianBpjsJadi = results[0]?.last_no_antrian_bpjs_jadi || 0;
      const lastNoAntrianRacikan = results[0]?.last_no_antrian_racikan || 0;
      const lastNoAntrianJadi = results[0]?.last_no_antrian_jadi || 0;

      io.to("bpjs-obat-racikan").emit("queueUpdated-bpjs-obat-racikan", { queueNumber: lastNoAntrianBpjsRacikan });
      io.to("bpjs-obat-jadi").emit("queueUpdated-bpjs-obat-jadi", { queueNumber: lastNoAntrianBpjsJadi });
      io.to("obat-racikan").emit("queueUpdated-obat-racikan", { queueNumber: lastNoAntrianRacikan });
      io.to("obat-jadi").emit("queueUpdated-obat-jadi", { queueNumber: lastNoAntrianJadi });

      console.log("Queue updates emitted successfully!");
    }
  );
};

module.exports = emitQueueUpdate;
