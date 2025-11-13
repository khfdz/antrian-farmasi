const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

// ===============================
// 🌐 CORS ORIGIN WHITELIST
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:1311",
  "http://localhost:1113",
  "http://192.168.10.106:5173",
  "http://192.168.10.106:1311",
  "http://192.168.10.106:1113",
  "http://192.168.10.106:4141"
];

app.use(
  cors({
    origin: (origin, callback) => {
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
// 🔥 IP WHITELIST (ANTI ORANG ASING)
// ===============================
const allowedIPs = [
  "127.0.0.1",           // localhost (backend)
  "192.168.10.106",      // server IP
  "192.168.10.184",       // contoh komputer kasir
  "192.168.10.21",       // contoh loket
  "192.168.10.22",       // contoh farmasi
];

// AUTO-DETECT IP DOCKER (misal 172.*)
function cleanIP(ip) {
  return ip.replace("::ffff:", "");
}

app.use((req, res, next) => {
  let clientIP = cleanIP(
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    ""
  );

  // Jika IP container docker (172.x.x.x)
  if (clientIP.startsWith("172.")) {
    return next(); // izinkan internal docker
  }

  if (!allowedIPs.includes(clientIP)) {
    console.log("❌ BLOCKED IP:", clientIP);
    return res.status(403).json({
      error: "Forbidden: Your IP is not allowed",
      ip: clientIP,
    });
  }

  next();
});

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

// load socket handlers
require("./sockets/antrianSocket")(io);
require("./sockets/audioSocket")(io);
require("./sockets/printSocket")(io);
require("./sockets/resetSocket")(io);

// ===============================
// 🚀 START SERVER
// ===============================
const PORT = process.env.PORT || 1311;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
