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
     * @type {{login: *, password: *}}
     */
    const data = {
        login: req.body.userName,
        nickname: req.body.userName,
        password: req.body.userPassword
    };

    Users.getUserByLogin(data.login, (error, result) => {
        if (!result) {
            Users.create(data, (err, docs) => {
                res.json({
                    ok: true,
                    message: 'User created!'
                })
            })
        } else {
            res.json({
                ok: false,
                message: 'User with the same nickname already exist'
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

    Users.getUserByLogin(data.login, (err, docs) => {
        if (docs !== null && data.password !== undefined) {
            if (data.password === docs.password) {
                Users.updateTokenAuthorization(docs.login, (err, docs) => {
                    if (err === null) {
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
                            message: "Server down",
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