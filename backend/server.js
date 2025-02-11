const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://192.168.1.200:5173",

  "http://192.168.1.128:5173",
  "http://192.168.1.128:5000",

  "http://192.168.1.130:5173",
  "http://192.168.1.130:5000",

  "http://192.168.1.14:5173",
  "http://192.168.1.14:5000",

  "http://192.168.1.136:5173",
  "http://192.168.1.136:5000",

  "http://192.168.1.127:5173",
  "http://192.168.1.127:5000",

  "http://192.168.1.5:5173",
  "http://192.168.1.5:5000",

  "http://localhost:5173",
  "http://192.168.x.x:5173",
];

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use(cors());
app.use(express.json());

const antrianRoutes = require("./routes/antrianRoutes");
const audioRoutes = require("./routes/audioRoutes");
app.use("/api/antrian", antrianRoutes);
app.use("/api/audio", audioRoutes);

require("./sockets/antrianSocket")(io);
require("./sockets/audioSocket")(io);
require("./sockets/printSocket")(io);

cron.schedule("0 0 * * *", () => {
  const currentTime = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Karawang",
  });
  console.log(`Resetting queue numbers at ${currentTime}`);

  db.query(
    "UPDATE antrian_counter SET last_no_antrian = 0 WHERE id = 1",
    (err) => {
      if (err) {
        console.error("Error resetting queue counter:", err);
      } else {
        console.log("Queue counter reset successfully!");
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
