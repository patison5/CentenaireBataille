function startFrontSocket (battle) {

    console.log("battle is: ", battle)

    function getParamUrl(param) {
        let params = window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function (p, e) {
                    let a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );
        return params[param];
    }

    let url = window.location.href;
    let arrUrl = url.split("/");
    let socketUrl = arrUrl[0] + "//" + arrUrl[2];

    let data = {
        battleId: getParamUrl("battle")
    };

    let ping = Date.now();

    socket = io.connect(socketUrl);

    socket.emit("getID");
    socket.emit("connectBattle", data);

    socket.on("getID", function (data) {
        console.log("ID: " + data);
    });

    socket.on("message", function (data) {
        let now = Date.now();
        console.log("Ping: " + (now - ping));
        ping = now;
        console.log(data);
    });

    socket.on("endBattle", function (data) {
        console.log(data);
    });

    socket.on('getData', function (data) {
        if (!data.message)
            battle.update(data);

        else 
            console.log(data.message)
    })

    socket.on('connectedBattle', function (data) {
        // console.log("Socket on connectedBattle emmited!")
        console.log(data);


        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

        if (data.ok) {
            if (!battle.userName)
                battle.userName = data.userName;

            if (!battle.idNumber)
                battle.idNumber = data.numberCLient;
        }

    })
}
