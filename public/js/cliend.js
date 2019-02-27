var socket =  io.connect('http://localhost:3306');

socket.on("new_message", (data) => {
    console.log(data)
}) 


// var btn = document.getElementById('btn');
// var el = 0;

// btn.addEventListener('click', function() {
//     socket.emit('new_message', {message: el++})
// })
