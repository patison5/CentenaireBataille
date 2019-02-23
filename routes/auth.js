const express = require('express');
const userController  = require('../controllers/users')


const router = express.Router();


// тестовый контроллер для регистрации пользователя
// доступ через http://localhost:3306/api/test2

router.post('/test2', userController.register);


module.exports = router;