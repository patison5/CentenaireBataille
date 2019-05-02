const Users = require('../models/users');

exports.index = (req, res) => {
    let user = "";
    Users.getUserByToken(req.cookies["token"], function (err, u) {
        let urlLogin = req.url.toString().split("/")[1];
        user = u;
        if (user) {
            if (user.login === urlLogin) {
                res.render("menuUser", {data: user});
            } else if (user) {
                Users.getUserByLogin(urlLogin, (err, data) => {
                    res.json(data);
                });
            }
        } else {
            res.redirect("http://" + req.headers["host"] + "/");
        }
    });
};

exports.goToIndex = (req, res) => {
    let user = "";
    Users.getUserByToken(req.cookies["token"], function (err, u) {
        user = u;
        if (user) {
            res.redirect("http://" + req.headers["host"] + "/user/" + user.login + "/");
        } else {
            res.redirect("http://" + req.headers["host"] + "/");
        }
    });
};
exports.battle = (req, res) => {
    res.render("battle");
};