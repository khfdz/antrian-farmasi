const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

// Route for calling queue
router.get('/call', audioController.callAudio);

module.exports = router;
