function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

window.onload = function () {

    /**
     * @param (url, arrUrl, socketUrl) - получение адреса для сокета
     * @type {string}
     */
    let url = window.location.href;
    let arrUrl = url.split("/");
    let socketUrl = arrUrl[0] + "//" + arrUrl[2];

    socket = io.connect(socketUrl);


    let connectServerSubmit = document.getElementById('js-connect_server__submit'),
        changeNicknameInput = document.getElementById('js-change_nickname-input');


    // connect_server__submit action
    connectServerSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let data = {
            login: document.cookie,
            serverId: document.getElementById('js-server_id').value
        };
        console.log(document.cookie);
        console.log(window.cookies);
        socket.emit("connectServer", data);

        $.ajax({
            type: "post",
            url: "/api/connect/",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data, null, 2)
        }).done(function (data) {
            console.log(data);
        });

        console.log(data)
    });


    changeNicknameInput.addEventListener('keyup', function (e) {
        e.preventDefault();

        userData.nickname = this.value
    })


    // gameInit();
    //let game = new Game();
};