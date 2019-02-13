const hostname = 'localhost';
const port = 3000;

// Создаем приложение с помощью Express
var express = require('express');
var app = express();


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
})

var server = app.listen(3000, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New User connected!')

    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        console.log('work motherfucker!')
        console.log('username changed' +  data.username)
        socket.username = data.usernam;
    })

    //io.sockets.emit('test', {message: 'hello'});



    socket.on('new_message', (data) => {
        console.log('that is fucking data: ', data.message)
        io.sockets.emit('new_message', {message: data.message})
    })
})
