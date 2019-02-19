var socket =  io.connect('http://localhost:3000');

socket.on("new_message", (data) => {
    console.log(data)
    var result = document.getElementById('result');
    result.innerHTML = data.message;
}) 


// var btn = document.getElementById('btn');
// var el = 0;

// btn.addEventListener('click', function() {
//     socket.emit('new_message', {message: el++})
// })
