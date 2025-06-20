const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklistController');

router.post('/document', controller.addDocumentChecklist);

router.post('/workingtool', controller.addMpsToolKitChecklist);
router.post('/workingtoolImg', controller.addWorkingToolImage);

router.post('/posmaterial', controller.addPosMaterialChecklist);
router.post('/posmaterialImg', controller.addPosMaterialImage);

router.post('/posinstall', controller.addPosInstallChecklist);
router.post('/posinstallImg', controller.addPosInstallImage);

router.post('/leavebehind', controller.addLeaveBehindChecklist);
router.post('/leavebehindImg', controller.addLeaveBehindImage);

router.post('/dresscode', controller.addDressCodeChecklist);
router.post('/dresscodeImg', controller.addDressImage);

module.exports = router;
