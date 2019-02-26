const socket = io();

socket.on('connect', function (){
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'Yonglin',
		text: 'Any message for demo'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected to server');
});

socket.on('newMessage', function(message){
	console.log('Get New Message', message);
});
