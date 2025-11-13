const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",       // Vite local
  "http://localhost:5000",       // backend local
  "http://192.168.10.106:5173",  // Vite di IP host
  "http://192.168.10.106:5000",  // backend di IP host
  "http://192.168.1.17:5173",    // alternatif IP (misal laptop/PC lain)
  "http://192.168.1.17:5000",
  "http://192.168.10.106:4141",  // ✅ tambahin frontend container Docker kamu
];

app.use(
  cors({
    origin: (origin, callback) => {
      // izinkan juga request tanpa Origin (contoh dari curl / Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// 🔗 ROUTES
// ===============================
const antrianRoutes = require("./routes/antrianRoutes");
const audioRoutes = require("./routes/audioRoutes");

app.use("/api/antrian", antrianRoutes);
app.use("/api/audio", audioRoutes);

// ===============================
// ⚡ SOCKET.IO
// ===============================
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

// ===============================
// 🚀 START SERVER
// ===============================
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
