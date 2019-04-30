exports.getCookie = function (socket) {
    let cookie = new Map();
    socket.handshake.headers.cookie.split(";").forEach((string) => {
        let temp = string.split("=");
        cookie.set(temp[0].trim(), temp[1].trim());
    });
    return cookie;
};