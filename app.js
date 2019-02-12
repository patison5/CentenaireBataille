const hostname = 'localhost';
const port = 3000;

// Создаем приложение с помощью Express
var express = require('express');
var app = express();

var server = app.listen(3000, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static('public'));

var socket = require ('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection (socket) {
	console.log(socket)
}