const db = require("../config/mysqlDB");

// Buat tabel `antrian_bpjs_obat_racikan`
db.query(
    `CREATE TABLE IF NOT EXISTS antrian_bpjs_obat_racikan (
        id_antrian INT AUTO_INCREMENT PRIMARY KEY,
        no_antrian VARCHAR(50) NOT NULL,
        waktu DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            console.error("Error creating antrian_bpjs_obat_racikan table:", err);
        } else {
            console.log("Table antrian_bpjs_obat_racikan created successfully!");
        }
    }
);

// Buat tabel `antrian_bpjs_obat_jadi`
db.query(
    `CREATE TABLE IF NOT EXISTS antrian_bpjs_obat_jadi (
        id_antrian INT AUTO_INCREMENT PRIMARY KEY,
        no_antrian VARCHAR(50) NOT NULL,
        waktu DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            console.error("Error creating antrian_bpjs_obat_jadi table:", err);
        } else {
            console.log("Table antrian_bpjs_obat_jadi created successfully!");
        }
    }
);

// Buat tabel `antrian_obat_jadi`
db.query(
    `CREATE TABLE IF NOT EXISTS antrian_obat_jadi (
        id_antrian INT AUTO_INCREMENT PRIMARY KEY,
        no_antrian VARCHAR(50) NOT NULL,
        waktu DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            console.error("Error creating antrian_obat_jadi table:", err);
        } else {
            console.log("Table antrian_obat_jadi created successfully!");
        }
    }
);

// Buat tabel `antrian_obat_racikan`
db.query(
    `CREATE TABLE IF NOT EXISTS antrian_obat_racikan (
        id_antrian INT AUTO_INCREMENT PRIMARY KEY,
        no_antrian VARCHAR(50) NOT NULL,
        waktu DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            console.error("Error creating antrian_obat_racikan table:", err);
        } else {
            console.log("Table antrian_obat_racikan created successfully!");
        }
    }
);

// Buat tabel `antrian_counter`
db.query(
    `CREATE TABLE IF NOT EXISTS antrian_counter (
        id INT AUTO_INCREMENT PRIMARY KEY,
        last_no_antrian INT DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            console.error("Error creating antrian_counter table:", err);
        } else {
            console.log("Table antrian_counter created successfully!");

            // Inisialisasi data awal di `antrian_counter`
            db.query(
                `INSERT INTO antrian_counter (id, last_no_antrian)
                VALUES (1, 0) ON DUPLICATE KEY UPDATE last_no_antrian = last_no_antrian`,
                (err) => {
                    if (err) {
                        console.error("Error initializing antrian_counter:", err);
                    } else {
                        console.log("Table antrian_counter initialized successfully!");
                    }
                    db.end(); // Tutup koneksi setelah semua selesai
                }
            );
        }
    }
);
