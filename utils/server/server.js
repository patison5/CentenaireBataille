// Создаем приложение с помощью Express
const routes = require('../../routes/index');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


const app = express();

/**
 * Установка папки статики
 */
app.use(express.static('public'));

/**
 * bodyParser - обработка параметров запроса
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Включаем обработку Cookie на клиенте
 */
app.use(cookieParser());

/**
 * Включаем обработку контента на выдачу
 */
app.set("view engine", "ejs");

/**
 * Вывод index страницы по адресу /, /index
 */
app.get(/^\/(index|)$/, (req, res) => {
    res.render('index')
});

/**
 * Личный кабинет пользователя
 */
app.use("/user", routes.menuUser);

/**
 * Обработка запросов регистрации
 */
app.use('/api', routes.auth);


module.exports = app;