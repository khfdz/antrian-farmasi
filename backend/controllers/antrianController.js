const db = require("../config/mysqlDB");

// ---------------- ANTRIAN BPJS OBAT RACIKAN -----------------

const tambahAntrianBpjsObatRacikan = async (req, res) => {
  try {
    const [counter] = await db.query(
      "SELECT last_no_antrian_bpjs_racikan FROM antrian_counter WHERE id = 1"
    );

    if (!counter.length) {
      return res.status(404).json({ error: "Counter not found" });
    }

    const newNo = counter[0].last_no_antrian_bpjs_racikan + 1;

    const [insert] = await db.query(
      "INSERT INTO antrian_bpjs_obat_racikan (no_antrian) VALUES (?)",
      [newNo]
    );

    await db.query(
      "UPDATE antrian_counter SET last_no_antrian_bpjs_racikan = ? WHERE id = 1",
      [newNo]
    );

    res.status(201).json({
      id: insert.insertId,
      no_antrian: newNo,
    });
  } catch (err) {
    console.error("Error tambahAntrianBpjsObatRacikan:", err);
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianBpjsObatRacikan = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM antrian_bpjs_obat_racikan");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAntrianBpjsObatRacikanLatest = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT no_antrian FROM antrian_bpjs_obat_racikan ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1"
    );

    if (!rows.length) return res.status(404).json({ message: "No antrian found" });

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianBpjsObatRacikanByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const [rows] = await db.query(
      "SELECT * FROM antrian_bpjs_obat_racikan WHERE status = ? ORDER BY waktu ASC",
      [status]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ubahStatusAntrianBpjsObatRacikan = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      "UPDATE antrian_bpjs_obat_racikan SET status = 1 WHERE id_antrian = ?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ error: "Antrian not found" });

    res.status(200).json({
      message: `Antrian ${id} updated successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//---------------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//

//---------------------------------------------ANTRIAN BPJS OBAT JADI-------------------------------------------//
// ---------------- ANTRIAN BPJS OBAT JADI -----------------

const tambahAntrianBpjsObatJadi = async (req, res) => {
  try {
    const [counter] = await db.query(
      "SELECT last_no_antrian_bpjs_jadi FROM antrian_counter WHERE id = 1"
    );

    if (!counter.length) {
      return res.status(404).json({ error: "Counter not found" });
    }

    const newNo = counter[0].last_no_antrian_bpjs_jadi + 1;

    const [insert] = await db.query(
      "INSERT INTO antrian_bpjs_obat_jadi (no_antrian) VALUES (?)",
      [newNo]
    );

    await db.query(
      "UPDATE antrian_counter SET last_no_antrian_bpjs_jadi = ? WHERE id = 1",
      [newNo]
    );

    res.status(201).json({
      id: insert.insertId,
      no_antrian: newNo,
    });
  } catch (err) {
    console.error("Error tambahAntrianBpjsObatJadi:", err);
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianBpjsObatJadi = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM antrian_bpjs_obat_jadi");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAntrianBpjsObatJadiLatest = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT no_antrian FROM antrian_bpjs_obat_jadi ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1"
    );

    if (!rows.length) return res.status(404).json({ message: "No antrian found" });

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianBpjsObatJadiByStatus = async (req, res) => {
  try {
    const status = req.params.status;

    const [rows] = await db.query(
      "SELECT * FROM antrian_bpjs_obat_jadi WHERE status = ? ORDER BY waktu ASC",
      [status]
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ubahStatusAntrianBpjsObatJadi = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      "UPDATE antrian_bpjs_obat_jadi SET status = 1 WHERE id_antrian = ?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ error: "Antrian not found" });

    res.status(200).json({
      message: `Antrian ${id} updated successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//---------------------------------------------ANTRIAN BPJS OBAT JADI-------------------------------------------//

//----------------------------------------------ANTRIAN OBAT RACIKAN--------------------------------------------//'
// ---------------- ANTRIAN OBAT RACIKAN (UMUM) -----------------

const tambahAntrianObatRacikan = async (req, res) => {
  try {
    const [counter] = await db.query(
      "SELECT last_no_antrian_racikan FROM antrian_counter WHERE id = 1"
    );

    if (!counter.length) {
      return res.status(404).json({ error: "Counter not found" });
    }

    const newNo = counter[0].last_no_antrian_racikan + 1;

    const [insert] = await db.query(
      "INSERT INTO antrian_obat_racikan (no_antrian) VALUES (?)",
      [newNo]
    );

    await db.query(
      "UPDATE antrian_counter SET last_no_antrian_racikan = ? WHERE id = 1",
      [newNo]
    );

    res.status(201).json({
      id: insert.insertId,
      no_antrian: newNo,
    });
  } catch (err) {
    console.error("Error tambahAntrianObatRacikan:", err);
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianObatRacikan = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM antrian_obat_racikan");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAntrianObatRacikanLatest = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT no_antrian FROM antrian_obat_racikan ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1"
    );

    if (!rows.length) return res.status(404).json({ message: "No antrian found" });

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianObatRacikanByStatus = async (req, res) => {
  try {
    const status = req.params.status;

    const [rows] = await db.query(
      "SELECT * FROM antrian_obat_racikan WHERE status = ? ORDER BY waktu ASC",
      [status]
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ubahStatusAntrianObatRacikan = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      "UPDATE antrian_obat_racikan SET status = 1 WHERE id_antrian = ?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ error: "Antrian not found" });

    res.status(200).json({
      message: `Antrian ${id} updated successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//----------------------------------------------ANTRIAN OBAT RACIKAN--------------------------------------------//

//----------------------------------------------ANTRIAN OBAT JADI--------------------------------------------//
// ---------------- ANTRIAN OBAT JADI (UMUM) -----------------

const tambahAntrianObatJadi = async (req, res) => {
  try {
    const [counter] = await db.query(
      "SELECT last_no_antrian_jadi FROM antrian_counter WHERE id = 1"
    );

    if (!counter.length) {
      return res.status(404).json({ error: "Counter not found" });
    }

    const newNo = counter[0].last_no_antrian_jadi + 1;

    const [insert] = await db.query(
      "INSERT INTO antrian_obat_jadi (no_antrian) VALUES (?)",
      [newNo]
    );

    await db.query(
      "UPDATE antrian_counter SET last_no_antrian_jadi = ? WHERE id = 1",
      [newNo]
    );

    res.status(201).json({
      id: insert.insertId,
      no_antrian: newNo,
    });
  } catch (err) {
    console.error("Error tambahAntrianObatJadi:", err);
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianObatJadi = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM antrian_obat_jadi");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAntrianObatJadiLatest = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT no_antrian FROM antrian_obat_jadi ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1"
    );

    if (!rows.length) {
      return res.status(404).json({ message: "No antrian found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAntrianObatJadiByStatus = async (req, res) => {
  try {
    const status = req.params.status;

    const [rows] = await db.query(
      "SELECT * FROM antrian_obat_jadi WHERE status = ? ORDER BY waktu ASC",
      [status]
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ubahStatusAntrianObatJadi = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      "UPDATE antrian_obat_jadi SET status = 1 WHERE id_antrian = ?",
      [id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ error: "Antrian not found" });
    }

    res.status(200).json({
      message: `Antrian ${id} updated to status 1 successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//----------------------------------------------ANTRIAN OBAT JADI--------------------------------------------//

// --------------------- RESET ANTRIAN ---------------------

const resetAntrian = async (req, res) => {
  const conn = await db.getConnection(); // ambil dedicated connection untuk transaksi

  try {
    await conn.beginTransaction(); // 🔥 mulai transaksi

    // 🔄 Reset semua counter
    await conn.query(`
      UPDATE antrian_counter SET
        last_no_antrian = 0,
        last_no_antrian_bpjs_jadi = 0,
        last_no_antrian_bpjs_racikan = 0,
        last_no_antrian_racikan = 0,
        last_no_antrian_jadi = 0,
        updated_at = NOW()
      WHERE id = 1
    `);

    // Semua tabel antrian
    const tables = [
      "antrian_bpjs_obat_racikan",
      "antrian_bpjs_obat_jadi",
      "antrian_obat_racikan",
      "antrian_obat_jadi",
    ];

    // 🔥 Reset semua tabel
    for (const table of tables) {
      await conn.query(`DELETE FROM ${table}`);
      await conn.query(
        `INSERT INTO ${table} (id_antrian, no_antrian, waktu, status)
         VALUES (1, 0, 0, 0)`
      );
    }

    await conn.commit(); // 💾 simpan transaksi

    res.status(200).json({
      message: "Queue and counter reset successfully",
    });
  } catch (err) {
    console.error("❌ Error in resetAntrian:", err);
    await conn.rollback(); // ⛔ rollback kalau error

    res.status(500).json({
      message: "Failed to reset queue data",
      error: err.message,
    });
  } finally {
    conn.release(); // pastikan koneksi dilepas
  }
};

//-------------------------------------------------RESET DATABASE--------------------------------------------//

module.exports = {
  //-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//
  tambahAntrianBpjsObatRacikan,
  getAllAntrianBpjsObatRacikan,
  getAntrianBpjsObatRacikanLatest,
  getAllAntrianBpjsObatRacikanByStatus,
  ubahStatusAntrianBpjsObatRacikan,
  //-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//

  //-----------------------------------------------ANTRIAN BPJS OBAT JADI-----------------------------------//
  tambahAntrianBpjsObatJadi,
  getAllAntrianBpjsObatJadi,
  getAntrianBpjsObatJadiLatest,
  getAllAntrianBpjsObatJadiByStatus,
  ubahStatusAntrianBpjsObatJadi,
  //-----------------------------------------------ANTRIAN BPJS OBAT JADI-----------------------------------//

  //-----------------------------------------------ANTRIAN OBAT RACIKAN-----------------------------------//
  tambahAntrianObatRacikan,
  getAllAntrianObatRacikan,
  getAntrianObatRacikanLatest,
  getAllAntrianObatRacikanByStatus,
  ubahStatusAntrianObatRacikan,
  //-----------------------------------------------ANTRIAN OBAT RACIKAN-----------------------------------//

  //-----------------------------------------------ANTRIAN OBAT JADI-----------------------------------//
  tambahAntrianObatJadi,
  getAllAntrianObatJadi,
  getAntrianObatJadiLatest,
  getAllAntrianObatJadiByStatus,
  ubahStatusAntrianObatJadi,
  //-----------------------------------------------ANTRIAN OBAT JADI-----------------------------------//

  resetAntrian,
};
