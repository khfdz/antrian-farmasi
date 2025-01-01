const express = require("express");
const { 
    tambahAntrianBpjsObatRacikan,
    getAllAntrianBpjsObatRacikan,
    tambahAntrianBPJSObatJadi,
    getAllAntrianBPJSObatJadi,
    tambahAntrianObatJadi,
    getAllAntrianObatJadi
 } = require("../controllers/antrianController");

const router = express.Router();

router.post("/bpjs/obat-racikan", tambahAntrianBpjsObatRacikan);   
router.get("/bpjs/obat-racikan", getAllAntrianBpjsObatRacikan);

router.post("/bpjs/obat-jadi", tambahAntrianBPJSObatJadi);   
router.get("/bpjs/obat-jadi", getAllAntrianBPJSObatJadi);

router.post("/obat-jadi", tambahAntrianObatJadi);   
router.get("/obat-jadi", getAllAntrianObatJadi);



module.exports = router;
