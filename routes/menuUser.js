const express = require('express');
const userController = require('../controllers/menuUser');

const router = express.Router();

router.get(/^\/[a-zA-Z0-9]+\/$/, userController.index);

router.get("/", userController.goToIndex);

module.exports = router;