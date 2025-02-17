module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("antrianPrint", (data) => {
      socket.join("printer");
      io.to("printer").emit("printAntrian", data);
      socket.emit("printAntrian", data);
    });
  });
};
