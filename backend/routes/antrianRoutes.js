const express = require("express");
const { 
    tambahAntrianBpjsObatRacikan,
    getAllAntrianBpjsObatRacikan,
    getAntrianBpjsObatRacikanLatest,
    getAllAntrianBpjsObatRacikanByStatus,
    ubahStatusAntrianBpjsObatRacikan,

    tambahAntrianBpjsObatJadi,
    getAllAntrianBpjsObatJadi,
    getAntrianBpjsObatJadiLatest,
    getAllAntrianBpjsObatJadiByStatus,
    ubahStatusAntrianBpjsObatJadi,

    tambahAntrianObatRacikan,
    getAllAntrianObatRacikan,
    getAntrianObatRacikanLatest,
    getAllAntrianObatRacikanByStatus,
    ubahStatusAntrianObatRacikan,

    tambahAntrianObatJadi,
    getAllAntrianObatJadi,
    getAntrianObatJadiLatest,
    getAllAntrianObatJadiByStatus,
    ubahStatusAntrianObatJadi

 } = require("../controllers/antrianController");

const router = express.Router();

router.post("/bpjs/obat-racikan", tambahAntrianBpjsObatRacikan);   
router.get("/bpjs/obat-racikan", getAllAntrianBpjsObatRacikan);
router.get("/bpjs/obat-racikan/latest", getAntrianBpjsObatRacikanLatest);
router.get("/bpjs/obat-racikan/:status", getAllAntrianBpjsObatRacikanByStatus);
router.patch("/bpjs/obat-racikan/:id/status", ubahStatusAntrianBpjsObatRacikan);


router.post("/bpjs/obat-jadi", tambahAntrianBpjsObatJadi);
router.get("/bpjs/obat-jadi", getAllAntrianBpjsObatJadi);
router.get("/bpjs/obat-jadi/latest", getAntrianBpjsObatJadiLatest);
router.get("/bpjs/obat-jadi/:status", getAllAntrianBpjsObatJadiByStatus);
router.patch("/bpjs/obat-jadi/:id/status", ubahStatusAntrianBpjsObatJadi);


router.post("/obat-racikan", tambahAntrianObatRacikan);
router.get("/obat-racikan", getAllAntrianObatRacikan);
router.get("/obat-racikan/latest", getAntrianObatRacikanLatest);
router.get("/obat-racikan/:status", getAllAntrianObatRacikanByStatus);
router.patch("/obat-racikan/:id/status", ubahStatusAntrianObatRacikan);

router.post("/obat-jadi", tambahAntrianObatJadi);
router.get("/obat-jadi", getAllAntrianObatJadi);
router.get("/obat-jadi/latest", getAntrianObatJadiLatest);
router.get("/obat-jadi/:status", getAllAntrianObatJadiByStatus);
router.patch("/obat-jadi/:id/status", ubahStatusAntrianObatJadi);

module.exports = router;
