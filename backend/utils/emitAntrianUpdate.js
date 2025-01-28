// const db = require("../config/mysqlDB");

// const emitAntrianUpdate = (io) => {
//   db.query(
//     "SELECT last_no_antrian_bpjs_racikan, last_no_antrian_bpjs_jadi, last_no_antrian_racikan, last_no_antrian_jadi FROM antrian_counter WHERE id = 1",
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching antrian numbers:", err);
//         return;
//       }

//       const lastNoAntrianBpjsRacikan =
//         results[0]?.last_no_antrian_bpjs_racikan || 0;
//       const lastNoAntrianBpjsJadi = results[0]?.last_no_antrian_bpjs_jadi || 0;
//       const lastNoAntrianRacikan = results[0]?.last_no_antrian_racikan || 0;
//       const lastNoAntrianJadi = results[0]?.last_no_antrian_jadi || 0;

//       io.to("bpjs-obat-racikan").emit("antrianUpdated-bpjs-obat-racikan", {
//         antrianNumber: lastNoAntrianBpjsRacikan,
//       });
//       io.to("bpjs-obat-jadi").emit("antrianUpdated-bpjs-obat-jadi", {
//         antrianNumber: lastNoAntrianBpjsJadi,
//       });
//       io.to("obat-racikan").emit("antrianUpdated-obat-racikan", {
//         antrianNumber: lastNoAntrianRacikan,
//       });
//       io.to("obat-jadi").emit("antrianUpdated-obat-jadi", {
//         antrianNumber: lastNoAntrianJadi,
//       });

//       console.log("Antrian updates emitted successfully!");
//     }
//   );
// };

// module.exports = emitAntrianUpdate;
