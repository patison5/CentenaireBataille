window.onload = function () {

    /**
     * @param (url, arrUrl, socketUrl) - получение адреса для сокета
     * @type {string}
     */
    let url = window.location.href;
    let arrUrl = url.split("/");
    let socketUrl = arrUrl[0] + "//" + arrUrl[2];

    socket = io.connect(socketUrl);

    /**
     * Elements control user
     * @type {HTMLElement | null}
     */
    let connectServerSubmit = document.getElementById('js-connect_server__submit'),
        changeNicknameInput = document.getElementById('js-change_nickname-input'),
        getListRooms = document.getElementById('js-list_rooms__submit');

    /**
     * Get list of Rooms
     */
    getListRooms.addEventListener('click', function (e) {
        e.preventDefault();
        socket.emit("getRooms");
    });

    /**
     * Choose room
     */
    connectServerSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let data = {
            serverId: document.getElementById('js-server_id').value
        };

        socket.emit("setRoom", data);
    });

    /**
     * Change nickname
     */
    changeNicknameInput.addEventListener('keyup', function (e) {

        if (e.code === "Enter") {
            let data = {
                nickname: changeNicknameInput.value
            };

            socket.emit("changeNickname", data);
        }
    });

    /**
     * Receive messages from server
     */
    socket.on("listRooms", function (data) {
        console.log("Rooms: " + data);
    });
    socket.on("sendRoom", function (data) {
        console.log(data);
    });
    socket.on("nicknameChanged", function () {
        location.reload();
    })
};