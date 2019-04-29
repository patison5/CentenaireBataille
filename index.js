const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');

const app = require('./server');

//const uri = "mongodb://root:qwerty78@centenairebatailledb-shard-00-00-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-01-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-02-bnck4.mongodb.net:27017/test?ssl=true&replicaSet=CentenaireBatailleDB-shard-0&authSource=admin&retryWrites=true";
const uri = "mongodb+srv://root:qwerty78@battle-ypufz.mongodb.net/test?retryWrites=true";

const hostname = 'localhost';
const port = 8080;

/**
 * Подключение к базе данных
 * @param {db}
 */
db.connect(uri, function (err) {
    if (err)
        return console.log(err);
});

/**
 *  Говорим express слушать порт (port)
 *  server - ссылка на порт, котоырй слушаем
 * @param (server)
 * @type {http.Server}
 */
const server = app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Получаем сокет, который работает на порту сервера (server)
 * @param (io)
 * @type {Server}
 */
const io = require('socket.io')(server);

/**
 * Связываемся по сокету с подключившемся клиентом
 *@param (connection)
 *
 */

io.sockets.on('connection', (socket) => {

    console.log(' %s sockets connected', io.engine.clientsCount);
    console.log('socket id: ', socket.id);


    socket.on('change_username', (data) => {
    });

    socket.on('new_message', (data) => {
        console.log('that is fucking data: ', data.message);
        io.sockets.emit('new_message', {message: data.message})
    });

    socket.on('disconnect', function () {
        console.log("disconnect: ", socket.id);
    });
});
