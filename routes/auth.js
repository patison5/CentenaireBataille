const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

/**
 * Обработка запроса на регистрацию
 */
router.post('/auth/registration', userController.register);

/**
 * Обработка запроса на вход
 */
router.post('/auth/login', userController.login);

/**
 * Получить список пользователей
 */
router.get('/users', userController.allUsers);

module.exports = router;