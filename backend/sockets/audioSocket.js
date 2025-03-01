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

    socket.on("updateCallRoom", (data) => {
      io.to("callRoom").emit("refreshCallPage", data);
    });

    socket.on("updateQueueView", (data) => {
      const { section, no_antrian } = data;
      io.emit("updateCallQueue", {
        section,
        queueNumber: no_antrian,
      });
    });

    socket.on("refreshQueue", () => {
      io.emit("refreshQueue");
    });
  });
};
