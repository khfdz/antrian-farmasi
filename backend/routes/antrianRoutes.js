const express = require("express");
const { 
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
 } = require("../controllers/antrianController");

const router = express.Router();

router.post("/bpjs/obat-racikan", tambahAntrianBpjsObatRacikan);   
router.get("/bpjs/obat-racikan", getAllAntrianBpjsObatRacikan);
router.get("/bpjs/obat-racikan/latest", getAntrianBpjsObatRacikanLatest);
router.get("/bpjs/obat-racikan/:status", getAllAntrianBpjsObatRacikanByStatus);
router.patch("/bpjs/obat-racikan/:id/status", ubahStatusAntrianBpjsObatRacikan);


router.post("/bpjs/obat-jadi", tambahAntrianBPJSObatJadi);   
router.get("/bpjs/obat-jadi", getAllAntrianBPJSObatJadi);

router.post("/obat-jadi", tambahAntrianObatJadi);   
router.get("/obat-jadi", getAllAntrianObatJadi);

router.post("/obat-racikan", tambahAntrianObatRacikan);   
router.get("/obat-racikan", getAllAntrianObatRacikan);



module.exports = router;
