// Создаем приложение с помощью Express
const routes  = require('./routes')
const express = require('express');

const app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");





app.get('/', (req, res) => {
    res.render('index')
})


app.use('/api',  routes.auth)








module.exports = app;