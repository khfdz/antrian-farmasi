module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client terhubung:", socket.id);

    socket.on("antrianPrint", (data) => {
      console.log(`Mencetak antrian:`, data);

      // Bergabung ke room "printer"
      socket.join("printer");

      // Kirim ke semua client di room "printer"
      io.to("printer").emit("printAntrian", data);

      // Kirim langsung ke pengirimnya sendiri
      socket.emit("printAntrian", data);
    });
  });
};
