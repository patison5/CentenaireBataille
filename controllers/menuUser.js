const Users = require('../models/users');

exports.index = (req, res) => {
    let user = "";
    console.log("cookie: " + req.cookies["token"]);
    Users.getUserByToken(req.cookies["token"], function (err, u) {
        user = u;
        if (user) {
            res.render("menuUser", {data: user});
        } else {
            res.redirect("http://" + req.headers["host"] + "/");
        }
    });
};

exports.goToIndex = (req, res) => {
    let user = "";
    console.log(req.cookies["token"]);
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