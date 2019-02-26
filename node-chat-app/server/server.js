const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const app = new express();
const server = http.createServer(app);
const io = socketIO(server);


const port = process.env.PORT || 3000;

var options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
}
// app.use(express.static(publicPath, options))
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
	socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));

	socket.on('createMessage', (message, callback)=>{
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		try{
			callback("You message is redistributed");
		}catch(e){
			console.log(e);
		}
	})

	socket.on('createLocationMessage', (coords)=>{
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', ()=>{
		console.log('User disconnected');
	});
});

server.listen(port, (res, req)=>{
	console.log(`Server is listening on port ${port}`);
});


console.log(__dirname + "/../public");
console.log(publicPath);
