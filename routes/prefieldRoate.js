const express = require('express');
const router = express.Router();
const controller = require('../controllers/prefieldController');

router.post('/attendance', controller.addPrefieldImplAdmin);
router.post('/vehiclereg', controller.addPreFieldVehicleRegister);

module.exports = router;