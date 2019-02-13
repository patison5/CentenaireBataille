
window.onload = function () {
    var socket =  io.connect('http://localhost:3000');

    console.log('thats the fucking id of you, pidor: ', socket);

    socket.on("new_message", (data) => {
        console.log(data)
        var result = document.getElementById('result');
        result.append(data.message)
    }) 


    var btn = document.getElementById('btn');
    var el = 0;

    btn.addEventListener('click', function() {
        socket.emit('new_message', {message: el++})
    })
}
