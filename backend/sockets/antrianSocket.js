// const db = require("../config/mysqlDB");
// const emitAntrianUpdate = require("../services/emitAntrianUpdate");

// module.exports = (io) => {
//   io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

//     socket.on("joinRoom", (room) => {
//       socket.join(room);
//       console.log(`Client joined room: ${room}`);
//     });

//     socket.on("sendQueueUpdate", ({ section, queueNumber }) => {
//       console.log(`📡 [Server] Menerima sendQueueUpdate: ${section} - ${queueNumber}`);
    
//       // Kirim update ke semua client di room terkait
//       io.to(section).emit("receiveQueueUpdate", { section, queueNumber });
    
//       // Atau jika ingin broadcast ke semua klien
//       // io.emit("receiveQueueUpdate", { section, queueNumber });
//     });
    
    

//     socket.on("disconnect", () => {
//       console.log("Client disconnected:", socket.id);
//     });
//   });

//   emitAntrianUpdate(io);
// };

const db = require("../config/mysqlDB");
const emitAntrianUpdate = require("../services/emitAntrianUpdate");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    socket.on("sendQueueUpdate", ({ section, queueNumber }) => {
      console.log(`📡 [Server] Menerima sendQueueUpdate: ${section} - ${queueNumber}`);
    
      // Kirim update ke semua client di room terkait
      io.to(section).emit("receiveQueueUpdate", { section, queueNumber });

      // 🚀 Emit tambahan khusus untuk PagePrint
      io.to("printRoom").emit("updatePagePrint", { room: section, antrianNumber: queueNumber });

      console.log(`📤 [Server] updatePagePrint dikirim ke printRoom: ${section} - ${queueNumber}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  emitAntrianUpdate(io);
};
