const express = require('express');
const userController = require('../controllers/menuUser');

const router = express.Router();

router.get(/^\/[a-zA-Z0-9]+\/$/, userController.index);

module.exports = router;