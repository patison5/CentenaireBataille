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
     *  Get socket ID, setted from server
     */
    socket.emit("getID");

    /**
     * Получаем текущие сражения
     */
    socket.emit("getCurrentBattle");

    /**
     * Elements control user
     * @type {HTMLElement | null}
     */
    let connectServerSubmit = document.getElementById('js-connect_server__submit'),
        changeNicknameInput = document.getElementById('js-change_nickname-input'),
        getListRooms = document.getElementById('js-list_rooms__submit');

    /**
     * Закрытие списка сражений
     */
    $(".close_battles").on("click", () => {

        $(".battles_wrap_jq").fadeOut(1000)
    });

    /**
     * Get list of Rooms
     */
    getListRooms.addEventListener('click', function (e) {
        e.preventDefault();
        socket.emit("listBattles");
    });

    /**
     * Create room
     */
    connectServerSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let data = {
            serverId: document.getElementById('js-server_id').value
        };

        socket.emit("createBattle", data);
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
    socket.on("getID", function (data) {
        console.log("ID: " + data);
    });

    socket.on("getCurrentBattle", (data) => {
        if (data.message.length > 0) {
            let text = "У вас есть незаконченная битва: " + data.message[0].name + " !</p> <br />" +
                "<p>Присоединиться ?</p>";
            showMessgae(text, "current_battle", "Присоединиться", data);
        }
    });

    socket.on("listBattles", function (data) {
        $(".battles_container").empty();
        let number = 0;
        for (let key in data.message) {
            let battle = data.message[key];
            number++;
            let template = String.raw`<div class="battle">
                                    <div class="number_battle">
                                        <p>${number}</p>
                                    </div>
                                    <div class="nameBattle">
                                        <p>${battle.name}</p>
                                    </div>
                                    <div class="user1">
                                        <p>${battle.user1}</p>
                                    </div>
                                    <div class="EnterBattle">
                                        <div data-idBattle="${battle.name}" class="enterBattleButton">
                                            <p>Присоединиться</p>
                                        </div>
                                    </div>
                                </div>`;

            $(".battles_container").append(template);
            let elem = $(".enterBattleButton").last();
            elem.click(function () {
                enterBattle($(this)[0]);
            });
        }
        $(".battles_wrap_jq").fadeIn(1000);
    });

    let enterBattle = function (elem) {
        let data = {
            idBattle: elem.getAttribute("data-idbattle")
        };
        socket.emit("enterBattle", data);
    };

    socket.on("createBattle", function (data) {
        let temp = "";
        for (let key in data) {
            temp += key + " : " + data[key];
        }
        showMessgae(data.message, "createBattle", "Подключиться", data);
        setTimeout(() => {
            window.location.href = window.location.href + data.url;
        }, 2000);
    });

    socket.on("nicknameChanged", function (data) {
        showMessgae(data.message, "nickname_changed", "Ок", data);
        if (data.ok) {
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    });

    socket.on("enterBattle", function (data) {
        if (data.ok) {
            document.location.href = window.location.href + "battle/?battle=" + data.message._id;
        } else {
            showMessgae(data.message, "error", "Ок", data);
        }
    });
    socket.on("reConnect", (data) => {
        document.location.href = window.location.href + "battle/?battle=" + data.message[0]._id;
    });
};