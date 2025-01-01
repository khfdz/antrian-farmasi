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

// Ambil semua antrian untuk BPJS Obat Racikan
const getAllAntrianBpjsObatRacikan = (req, res) => {
    db.query("SELECT * FROM antrian_bpjs_obat_racikan", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
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

        const lastNoAntrian = result[0].last_no_antrian_jadi;
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
    db.query("SELECT last_no_antrian FROM antrian_counter WHERE id = 1", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Data not found in antrian_counter" });
        }

        const lastNoAntrian = result[0].last_no_antrian;
        const newNoAntrian = lastNoAntrian + 1;

        db.query(
            "INSERT INTO antrian_obat_jadi (no_antrian) VALUES (?)",
            [newNoAntrian],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

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

module.exports = {
    tambahAntrianBpjsObatRacikan,
    getAllAntrianBpjsObatRacikan,
    tambahAntrianBPJSObatJadi,
    getAllAntrianBPJSObatJadi,
    tambahAntrianObatJadi,
    getAllAntrianObatJadi
};
