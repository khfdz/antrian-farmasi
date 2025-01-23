const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const cron = require("node-cron");
require("dotenv").config();

// Konfigurasi Express
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://192.168.1.200:5173",
  "http://localhost:5173",
  "http://192.168.x.x:5173",
]

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Rute API
const antrianRoutes = require("./routes/antrianRoutes");
const audioRoutes = require("./routes/audioRoutes");
app.use("/api/antrian", antrianRoutes);
app.use("/api/audio", audioRoutes);

// Socket untuk antrian dan audio
require("./sockets/queueSocket")(io);
require("./sockets/audioSocket")(io);

// Reset nomor antrian setiap 12 malam
cron.schedule("0 0 * * *", () => {
  const currentTime = new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" });
  console.log(`Resetting queue numbers at ${currentTime}`);

  db.query("UPDATE antrian_counter SET last_no_antrian = 0 WHERE id = 1", (err) => {
    if (err) {
      console.error("Error resetting queue counter:", err);
    } else {
      console.log("Queue counter reset successfully!");
    }
  });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  
});
