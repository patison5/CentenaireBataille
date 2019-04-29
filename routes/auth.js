const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/auth/registration', userController.register);
router.post('/auth/login', userController.login);
router.get('/users', userController.allUsers);

module.exports = router;