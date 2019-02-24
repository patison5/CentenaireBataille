const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');

const app = require('./server')


const uri = "mongodb://root:qwerty78@centenairebatailledb-shard-00-00-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-01-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-02-bnck4.mongodb.net:27017/test?ssl=true&replicaSet=CentenaireBatailleDB-shard-0&authSource=admin&retryWrites=true";
const hostname = 'localhost';
const port = 3306;



db.connect(uri, function(err) {
	if (err) 
		return console.log(err);

	const server = app.listen(port, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});



	// sockets
	const io = require('socket.io')(server);

	io.on('connection', (socket) => {

	    console.log(' %s sockets connected', io.engine.clientsCount);
	    console.log('socket id: ', socket.id);
	    
	    socket.username = "Anonymous"

	    socket.on('change_username', (data) => {
	        console.log('work motherfucker!')
	        console.log('username changed' +  data.username)
	        socket.username = data.usernam;
	    })

	    socket.on('new_message', (data) => {
	        console.log('that is fucking data: ', data.message)
	        io.sockets.emit('new_message', {message: data.message})
	    })

	    socket.on('connection', function() {
	        console.log("connection: ", socket.id);
	    });
	    socket.on('disconnect', function() {
	        console.log("disconnect: ", socket.id);
	        setTimeout(() => socket.disconnect(true), 5000);
	    });
	})
});


