const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://192.168.1.14:5173",
  "http://192.168.1.14:5000",
  "http://192.168.1.128:5173",
  "http://192.168.1.128:5000",
  "http://localhost:5173",
  "http://192.168.x.x:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const antrianRoutes = require("./routes/antrianRoutes");
const audioRoutes = require("./routes/audioRoutes");

app.use("/api/antrian", antrianRoutes);
app.use("/api/audio", audioRoutes);

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

require("./sockets/antrianSocket")(io);
require("./sockets/audioSocket")(io);
require("./sockets/printSocket")(io);
require("./sockets/resetSocket")(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0");
