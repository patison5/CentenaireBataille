const express = require('express');
const userController = require('../controllers/menuUser');

const router = express.Router();

router.get("/", userController.goToIndex);

router.get(/^\/[a-zA-Z0-9]+\/$/, userController.index);

router.get(/^\/[a-zA-Z0-9]+\/battle(\/|)$/, userController.battle);

module.exports = router;