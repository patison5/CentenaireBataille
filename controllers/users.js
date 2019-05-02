/**
 * Подключаем модель users для доступа к данных
 */
const Users = require('../models/users');

exports.register = (req, res) => {
    /**
     * data -
     * {
     * - получаем из запроса POST данные
     * }
     * @type {{login: *, nickname: *, password: *}}
     */
    const data = {
        login: req.body.userName,
        nickname: req.body.userName,
        password: req.body.userPassword,
        battle: null
    };

    /**
     * Получаем данные пользователя по логину
     *      -Если такой пользователь есть, то выводим ошибку, о том что пользователь существует
     */
    Users.getUserByLogin(data.login, (error, result) => {
        if (!result) {
            Users.create(data, (err) => {
                if (!err) {
                    res.json({
                        ok: true,
                        message: 'User created!'
                    });
                } else {
                    res.json({
                        ok: false,
                        message: "Cann't registr"
                    });
                }
            })
        } else {
            res.json({
                ok: false,
                message: 'User with the same login already exist'
            })
        }
    })
};

exports.login = (req, res) => {
    /**
     * data -
     * {
     * - получаем из запроса POST данные
     * }
     * @type {{login: *, password: *}}
     */
    const data = {
        login: req.body.userName,
        password: req.body.userPassword
    };
    /**
     * Получаем пользователя о введенному логину
     */
    Users.getUserByLogin(data.login, (err, docs) => {
        /**
         * Проверяем нашелся ли пользватель
         */
        if (docs !== null && data.password !== undefined) {
            /**
             * Проверяем совпадают ли пароли
             */
            if (data.password === docs.password) {
                /**
                 * Устанавливаем токен авторизации пользователя
                 */
                Users.updateTokenAuthorization(docs.login, (err, docs) => {
                    if (!err) {
                        /**
                         * Свойства куки
                         * @type {{domain: null, path: string, httpOnly: boolean, secure: boolean, expires: Date}}
                         */
                        const optionsCookie = {
                            domain: null,
                            path: "/",
                            httpOnly: true,
                            secure: false,
                            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
                        };

                        /**
                         * res.cookie -
                         * {
                         * -Устанавливаем куки
                         * }
                         */
                        res.cookie("token", docs.value.token, optionsCookie);
                        res.cookie("login", docs.value.login, optionsCookie);

                        res.json({
                            ok: true,
                            message: "Redirect",
                            url: "http://" + req.headers["host"] + "/user/" + docs.value.login + "/"
                        });
                    } else {
                        res.json({
                            ok: false,
                            message: "Server down"
                        });
                    }
                });
            } else {
                res.json({
                    ok: false,
                    message: "Wrong password or login"
                });
            }
        } else {
            res.json({
                ok: false,
                message: "Wrong password or login"
            });
        }
    });

};


exports.allUsers = (req, res) => {
    Users.allUsers(function (err, docs) {
        res.send(docs)
    })
};