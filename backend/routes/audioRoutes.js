const express = require("express");
const router = express.Router();
const audioController = require("../controllers/audioController");

router.get("/call", audioController.callAudio);

module.exports = router;
