const db = require("../config/mysqlDB");
const { get } = require("../routes/antrianRoutes");

//----------------------------------------------------------ANTRIAN BPJS OBAT RACIKAN----------------------------//
const tambahAntrianBpjsObatRacikan = (req, res) => {
  db.query(
    "SELECT last_no_antrian_bpjs_racikan FROM antrian_counter WHERE id = 1",
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ error: "Data not found in antrian_counter" });
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
    }
  );
};

const getAllAntrianBpjsObatRacikan = (req, res) => {
  db.query("SELECT * FROM antrian_bpjs_obat_racikan", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

const getAntrianBpjsObatRacikanLatest = (req, res) => {
  db.query(
    "SELECT no_antrian FROM antrian_bpjs_obat_racikan ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.length > 0) {
        console.log("Database result:", result[0]);
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "No antrian found" });
      }
    }
  );
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

const ubahStatusAntrianBpjsObatRacikan = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE antrian_bpjs_obat_racikan SET status = 1 WHERE id_antrian = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Antrian not found" });
      }

      res.status(200).json({
        message: `Antrian with ID ${id} updated to status 1 successfully`,
      });
    }
  );
};
//---------------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//

//-----------------------------------------------ANTRIAN BPJS OBAT JADI------------------------------------------//
const tambahAntrianBpjsObatJadi = (req, res) => {
  db.query(
    "SELECT last_no_antrian_bpjs_jadi FROM antrian_counter WHERE id = 1",
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ error: "Data not found in antrian_counter" });
      }

      const lastNoAntrian = result[0].last_no_antrian_bpjs_jadi;

      if (
        isNaN(lastNoAntrian) ||
        lastNoAntrian === null ||
        lastNoAntrian === undefined
      ) {
        return res
          .status(500)
          .json({ error: "Invalid value for last_no_antrian_bpjs_jadi" });
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
    }
  );
};

const getAllAntrianBpjsObatJadi = (req, res) => {
  db.query("SELECT * FROM antrian_bpjs_obat_jadi", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

const getAntrianObatBpjsObatJadiLatest = (req, res) => {
  db.query(
    "SELECT no_antrian FROM antrian_bpjs_obat_jadi ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.length > 0) {
        console.log("Database result:", result[0]);
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "No antrian found" });
      }
    }
  );
};

const getAllAntrianBpjsObatJadiByStatus = (req, res) => {
  const status = req.params.status;

  db.query(
    "SELECT * FROM antrian_bpjs_obat_jadi WHERE status = ? ORDER BY waktu ASC",
    [status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result);
    }
  );
};
const ubahStatusAntrianBpjsObatJadi = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE antrian_bpjs_obat_jadi SET status = 1 WHERE id_antrian = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Antrian not found" });
      }

      res.status(200).json({
        message: `Antrian with ID ${id} updated to status 1 successfully`,
      });
    }
  );
};
//-----------------------------------------------ANTRIAN BPJS OBAT JADI------------------------------------------//

//-----------------------------------------------ANTRIAN OBAT JADI-----------------------------------------------//
const tambahAntrianObatJadi = (req, res) => {
  db.query(
    "SELECT last_no_antrian_jadi FROM antrian_counter WHERE id = 1",
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ error: "Data not found in antrian_counter" });
      }

      const lastNoAntrian = result[0].last_no_antrian_jadi;

      if (
        isNaN(lastNoAntrian) ||
        lastNoAntrian === null ||
        lastNoAntrian === undefined
      ) {
        return res
          .status(500)
          .json({ error: "Invalid value for last_no_antrian_jadi" });
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
    }
  );
};

const getAllAntrianObatJadi = (req, res) => {
  db.query("SELECT * FROM antrian_obat_jadi", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

const getAntrianObatJadiLatest = (req, res) => {
  db.query(
    "SELECT no_antrian FROM antrian_obat_jadi ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.length > 0) {
        console.log("Database result:", result[0]);
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "No antrian found" });
      }
    }
  );
};

const getAllAntrianObatJadiByStatus = (req, res) => {
  const status = req.params.status;

  db.query(
    "SELECT * FROM antrian_obat_jadi WHERE status = ? ORDER BY waktu ASC",
    [status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result);
    }
  );
};

const ubahStatusAntrianObatJadi = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE antrian_obat_jadi SET status = 1 WHERE id_antrian = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Antrian not found" });
      }

      res.status(200).json({
        message: `Antrian with ID ${id} updated to status 1 successfully`,
      });
    }
  );
};
//-----------------------------------------------ANTRIAN OBAT JADI-----------------------------------------------//

//-----------------------------------------------ANTRIAN OBAT RACIKAN--------------------------------------------//
const tambahAntrianObatRacikan = (req, res) => {
  db.query(
    "SELECT last_no_antrian_racikan FROM antrian_counter WHERE id = 1",
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ error: "Data not found in antrian_counter" });
      }

      const lastNoAntrian = result[0].last_no_antrian_racikan;

      if (
        isNaN(lastNoAntrian) ||
        lastNoAntrian === null ||
        lastNoAntrian === undefined
      ) {
        return res
          .status(500)
          .json({ error: "Invalid value for last_no_antrian_racikan" });
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
    }
  );
};

const getAllAntrianObatRacikan = (req, res) => {
  db.query("SELECT * FROM antrian_obat_racikan", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

const getAntrianObatRacikanLatest = (req, res) => {
  db.query(
    "SELECT no_antrian FROM antrian_obat_racikan ORDER BY CAST(no_antrian AS UNSIGNED) DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.length > 0) {
        console.log("Database result:", result[0]);
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "No antrian found" });
      }
    }
  );
};

const getAllAntrianObatRacikanByStatus = (req, res) => {
  const status = req.params.status;

  db.query(
    "SELECT * FROM antrian_obat_racikan WHERE status = ? ORDER BY waktu ASC",
    [status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result);
    }
  );
};

const ubahStatusAntrianObatRacikan = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE antrian_obat_racikan SET status = 1 WHERE id_antrian = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Antrian not found" });
      }

      res.status(200).json({
        message: `Antrian with ID ${id} updated to status 1 successfully`,
      });
    }
  );
};
//-----------------------------------------------ANTRIAN OBAT RACIKAN--------------------------------------------//

module.exports = {
//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//
  tambahAntrianBpjsObatRacikan,
  getAllAntrianBpjsObatRacikan,
  getAntrianBpjsObatRacikanLatest,
  getAllAntrianBpjsObatRacikanByStatus,
  ubahStatusAntrianBpjsObatRacikan,
//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//
  
//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//
  tambahAntrianBpjsObatJadi,
  getAllAntrianBpjsObatJadi,
  getAntrianObatBpjsObatJadiLatest,
  getAllAntrianBpjsObatJadiByStatus,
  ubahStatusAntrianBpjsObatJadi,
  //-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//

//-----------------------------------------------ANTRIAN OBAT JADI-------------------------------------------//
  tambahAntrianObatJadi,
  getAllAntrianObatJadi,
  getAntrianObatJadiLatest,
  getAllAntrianObatJadiByStatus,
  ubahStatusAntrianObatJadi,
  //-----------------------------------------------ANTRIAN OBAT JADI-------------------------------------------//

  //-----------------------------------------------ANTRIAN OBAT RACIKAN-------------------------------------------//
  tambahAntrianObatRacikan,
  getAllAntrianObatRacikan,
  getAntrianObatRacikanLatest,
  getAllAntrianObatRacikanByStatus,
  ubahStatusAntrianObatRacikan,
  //-----------------------------------------------ANTRIAN OBAT RACIKAN-------------------------------------------//
};
