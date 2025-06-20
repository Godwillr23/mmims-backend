const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/loginHistory', userController.loginHistory);
router.get('/user/:id', userController.getUserDetails);
router.post('/profileToUpdate', userController.profileToUpdate);

//update route
// router.put('/profile/:id', userController.updateUser);



module.exports = router;
