const db = require('./utils/db/db');

const app = require('./utils/server/server');

const socket = require("./utils/socket/socket");
//const uri = "mongodb://root:qwerty78@centenairebatailledb-shard-00-00-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-01-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-02-bnck4.mongodb.net:27017/test?ssl=true&replicaSet=CentenaireBatailleDB-shard-0&authSource=admin&retryWrites=true";
//const uri = "mongodb+srv://root:qwerty78@battle-ypufz.mongodb.net/test?retryWrites=true";
const uri = "mongodb://localhost:27017/";
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
 * Иницилизируем класс работы со сокетами
 */
socket.set(server);
socket.init();
