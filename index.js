const db = require('./utils/db/db');

const app = require('./utils/server/server');

const socket = require("./utils/socket/socket");

const BattleManager = require("./utils/battleManager/battleManager");

//const uri = "mongodb://root:qwerty78@centenairebatailledb-shard-00-00-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-01-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-02-bnck4.mongodb.net:27017/test?ssl=true&replicaSet=CentenaireBatailleDB-shard-0&authSource=admin&retryWrites=true";
//const uri = "mongodb+srv://root:qwerty78@battle-ypufz.mongodb.net/test?retryWrites=true";
const uri = "mongodb://localhost:27017/";
const hostname = 'localhost';
const port = 8080;

/**
 *  Говорим express слушать порт (port)
 *  server - ссылка на порт, котоырй слушаем
 * @param (port) - порт сервера
 */
const server = app.listen(port, () => {
    console.log("Server created !");
    console.log(`Server running at http://${hostname}:${port}/`);

    /**
     * Иницилизируем класс работы со сокетами
     * @param(server) - сервер Express
     */

    socket.set(server);
    socket.init((data) => {
        console.log(data);
    });

    /**
     * Подключение к базе данных
     * @param {url} - ссылка на базу данных
     */
    db.connect(uri, (err) => {
        if (!err) {
            console.log("Database connected!");
            BattleManager.init((data) => {
                console.log(data);
            });
        } else {
            return console.log(err);
        }
    });
});

