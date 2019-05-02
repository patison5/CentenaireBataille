const express = require('express');
const userController = require('../controllers/menuUser');

const router = express.Router();

/**
 * Домашний католог личного кабинета
 */
router.get("/", userController.goToIndex);
router.get(/^\/[a-zA-Z0-9]+$/, userController.goToIndex);

/**
 * Домашний католог личного кабинета (основной)
 */
router.get(/^\/[a-zA-Z0-9]+\/$/, userController.index);

/**
 * Сражение пользователя
 */
router.get(/^\/[a-zA-Z0-9]+\/battle(\/|)$/, userController.battle);

module.exports = router;