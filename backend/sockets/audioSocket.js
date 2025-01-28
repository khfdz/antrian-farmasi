module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected for audio:", socket.id);

    socket.on("joinRoom", (room) => {
      if (room === "callRoom") {
        socket.join(room);
        console.log(`Client joined audio room: ${room}`);
      }
    });

    socket.on("triggerCallAudio", (data) => {
      console.log("Trigger call audio:", data);
      io.to("callRoom").emit("playCallAudio", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from audio:", socket.id);
    });
  });
};
