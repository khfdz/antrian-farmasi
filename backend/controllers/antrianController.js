const db = require("../config/mysqlDB");

// Tambahkan antrian baru untuk BPJS Obat Racikan
const tambahAntrianBpjsObatRacikan = (req, res) => {
    db.query("SELECT last_no_antrian_bpjs_racikan FROM antrian_counter WHERE id = 1", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
    
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Data not found in antrian_counter" });
        }
    
        const lastNoAntrian = result[0].last_no_antrian_bpjs_racikan;
        const newNoAntrian = lastNoAntrian + 1;

        db.query(
            "INSERT INTO antrian_bpjs_obat_racikan (no_antrian) VALUES (?)",
            [newNoAntrian],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.query(
                    "UPDATE antrian_counter SET last_no_antrian_bpjs_racikan = ? WHERE id = 1",
                    [newNoAntrian],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }

                        res.status(201).json({
                            id: result.insertId,
                            no_antrian: newNoAntrian,
                        });
                    }
                );
            }
        );
    });
};

const ubahStatusAntrianBpjsObatRacikan = (req, res) => {
    const { id } = req.params; // Ambil ID dari parameter URL

    db.query(
        "UPDATE antrian_bpjs_obat_racikan SET status = 1 WHERE id_antrian = ?",
        [id], // Parameter untuk ID
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Antrian not found" });
            }

            res.status(200).json({ message: `Antrian with ID ${id} updated to status 1 successfully` });
        }
    );
};



// Ambil semua antrian untuk BPJS Obat Racikan
const getAllAntrianBpjsObatRacikan = (req, res) => {
    db.query("SELECT * FROM antrian_bpjs_obat_racikan", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

const getAllAntrianBpjsObatRacikanByStatus = (req, res) => {
    const status = req.params.status;

    db.query(
        "SELECT * FROM antrian_bpjs_obat_racikan WHERE status = ? ORDER BY waktu ASC",
        [status],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        }
    );
};


const getAntrianBpjsObatRacikanLatest = (req, res) => {
    db.query(
        "SELECT no_antrian FROM antrian_bpjs_obat_racikan ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1",
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: err.message });
            }
            if (result.length > 0) {
                console.log('Database result:', result[0]);
                res.status(200).json(result[0]); // Kirim hasil pertama
            } else {
                res.status(404).json({ message: 'No antrian found' });
            }
        }
    );
};



// Tambahkan antrian baru untuk BPJS Obat Jadi
const tambahAntrianBPJSObatJadi = (req, res) => {
    db.query("SELECT last_no_antrian_bpjs_jadi FROM antrian_counter WHERE id = 1", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Data not found in antrian_counter" });
        }

        const lastNoAntrian = result[0].last_no_antrian_bpjs_jadi;

        // Validasi apakah lastNoAntrian adalah angka
        if (isNaN(lastNoAntrian) || lastNoAntrian === null || lastNoAntrian === undefined) {
            return res.status(500).json({ error: "Invalid value for last_no_antrian_bpjs_jadi" });
        }

        const newNoAntrian = lastNoAntrian + 1;

        db.query(
            "INSERT INTO antrian_bpjs_obat_jadi (no_antrian) VALUES (?)",
            [newNoAntrian],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.query(
                    "UPDATE antrian_counter SET last_no_antrian_bpjs_jadi = ? WHERE id = 1",
                    [newNoAntrian],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }

                        res.status(201).json({
                            id: result.insertId,
                            no_antrian: newNoAntrian,
                        });
                    }
                );
            }
        );
    });
};


// Ambil semua antrian untuk BPJS Obat Jadi
const getAllAntrianBPJSObatJadi = (req, res) => {
    db.query("SELECT * FROM antrian_bpjs_obat_jadi", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

const tambahAntrianObatJadi = (req, res) => {
    db.query("SELECT last_no_antrian_jadi FROM antrian_counter WHERE id = 1", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Data not found in antrian_counter" });
        }

        const lastNoAntrian = result[0].last_no_antrian_jadi;

        // Validasi apakah lastNoAntrian adalah angka
        if (isNaN(lastNoAntrian) || lastNoAntrian === null || lastNoAntrian === undefined) {
            return res.status(500).json({ error: "Invalid value for last_no_antrian_jadi" });
        }

        const newNoAntrian = lastNoAntrian + 1;

        db.query(
            "INSERT INTO antrian_obat_jadi (no_antrian) VALUES (?)",
            [newNoAntrian],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.query(
                    "UPDATE antrian_counter SET last_no_antrian_jadi = ? WHERE id = 1",
                    [newNoAntrian],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                    }
                );

                res.status(201).json({
                    id: result.insertId,
                    no_antrian: newNoAntrian,
                });
            }
        );
    });
};

const getAllAntrianObatJadi = (req, res) => {
    db.query("SELECT * FROM antrian_obat_jadi", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

const tambahAntrianObatRacikan = (req, res) => {
    db.query("SELECT last_no_antrian_racikan FROM antrian_counter WHERE id = 1", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Data not found in antrian_counter" });
        }

        const lastNoAntrian = result[0].last_no_antrian_racikan;

        // Validasi nilai lastNoAntrian
        if (isNaN(lastNoAntrian) || lastNoAntrian === null || lastNoAntrian === undefined) {
            return res.status(500).json({ error: "Invalid value for last_no_antrian_racikan" });
        }

        const newNoAntrian = lastNoAntrian + 1;

        db.query(
            "INSERT INTO antrian_obat_racikan (no_antrian) VALUES (?)",
            [newNoAntrian],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.query(
                    "UPDATE antrian_counter SET last_no_antrian_racikan = ? WHERE id = 1",
                    [newNoAntrian],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }

                        res.status(201).json({
                            id: result.insertId,
                            no_antrian: newNoAntrian,
                        });
                    }
                );
            }
        );
    });
};


const getAllAntrianObatRacikan = (req, res) => {    
    db.query("SELECT * FROM antrian_obat_racikan", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });    
}

module.exports = {
    tambahAntrianBpjsObatRacikan,
    getAllAntrianBpjsObatRacikan,
    getAntrianBpjsObatRacikanLatest,
    getAllAntrianBpjsObatRacikanByStatus,
    ubahStatusAntrianBpjsObatRacikan,

    tambahAntrianBPJSObatJadi,
    getAllAntrianBPJSObatJadi,
    tambahAntrianObatJadi,
    getAllAntrianObatJadi,
    tambahAntrianObatRacikan,
    getAllAntrianObatRacikan
};
