module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
      if (room === "callRoom") {
        socket.join(room);
      }
    });

    socket.on("triggerCallAudio", (data) => {
      io.to("callRoom").emit("playCallAudio", data);
    });

    socket.on("updateQueueView", (data) => {
      io.emit("updateCallQueue", data);
      io.emit("refreshQueue");
    });

    socket.on("refreshQueue", () => {
      console.log("🔄 Event refreshQueue diterima, broadcast ke semua client...");
      io.emit("refreshQueue"); 
    });
  });
};
