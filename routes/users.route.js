const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller.js');

router.post('/register', userController.addUser);
router.post('/login', userController.getUser);

module.exports = router;