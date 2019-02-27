const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const app = new express();
const server = http.createServer(app);
const io = socketIO(server);
var users = new Users();


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

	socket.on('join', (params, callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		// socket.leave(params.room);
		//io.emit: Message to all connected users;
		// socket.broadcast.emit: Every connected to the server except the current user
		// socket.emit: to one specific users
		// io.to(param.room).emit(); chain them
		// socket.broadcast.to(param.room).emit(); chain them

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} joined`));

		callback();
	});

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
		let user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} had left`));
		}
	});

	socket.on('updateUserList', function(users){
		console.log('Users List', users);
	});


});

server.listen(port, (res, req)=>{
	console.log(`Server is listening on port ${port}`);
});


console.log(__dirname + "/../public");
console.log(publicPath);
