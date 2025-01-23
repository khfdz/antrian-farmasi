module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("Client connected for audio:", socket.id);
  
      // Bergabung ke room audio
      socket.on("joinRoom", (room) => {
        if (room === "callRoom") {
          socket.join(room);
          console.log(`Client joined audio room: ${room}`);
        }
      });
  
      // Trigger untuk memutar audio
      socket.on("triggerCallAudio", (data) => {
        console.log("Trigger call audio:", data);
        io.to("callRoom").emit("playCallAudio", data);
      });
  
      // Bersihkan saat client disconnect
      socket.on("disconnect", () => {
        console.log("Client disconnected from audio:", socket.id);
      });
    });
  };
  