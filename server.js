// Создаем приложение с помощью Express
const routes = require('./routes');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Включаем обработку Cookie на клиенте
 */
app.use(cookieParser());

app.set("view engine", "ejs");

/**
 * Вывод index страницы по адресу /
 */
app.get('/', (req, res) => {
    res.render('index')
});

/**
 * Вывод index страницы по адресу /index
 */
app.get('/index', (req, res) => {
    res.render('index')
});

app.use("/user", routes.menuUser);

/**
 * Обработка запросов регистрации
 */
app.use('/api', routes.auth);


module.exports = app;