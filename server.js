// Создаем приложение с помощью Express
const routes  = require('./routes')
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('public'));
// app.use('*/public', express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render('index')
})


app.use('/api',  routes.auth)


module.exports = app;