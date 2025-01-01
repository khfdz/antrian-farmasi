const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const db = require("./config/mysqlDB");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const antrianRoutes = require("./routes/antrianRoutes");
const audioRoutes = require("./routes/audioRoutes");

// Gunakan routes
app.use("/api/antrian", antrianRoutes);
app.use("/api/audio", audioRoutes);

// Reset nomor antrian setiap jam 12 malam WITA
cron.schedule("0 0 * * *", () => {
    const currentTime = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Makassar",
    });
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
