const socket = io();

function scrollToBottom(){
	const messages = $("#messages");
	const newMessage = messages.children('li:last-child');
	const clientHeight = messages.prop('clientHeight');
	const scrollTop = messages.prop('scrollTop');
	const scrollHeight = messages.prop('scrollHeight');
	const newMessageHeight = newMessage.innerHeight();
	const lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight > scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function (){
	console.log('Connected to server');
	const params = $.deparam(window.location.search);
	console.log(params);

	socket.emit('join', params, function(err){
		if(err){
			alert(err);
			window.location.href = '/';
		}else{
			console.log('No Error');
		}
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected to server');
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function(message){
	// const formattedTime = moment(message.createdAt).format('h:mm a').replace(/\s/g,'');
	const formattedTime = moment(message.createdAt).format('h:mm a');
	const template = $("#message-template").html();
	const html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$("#messages").append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message){
	const formattedTime = moment(message.createdAt).format('h:mm a');
	const template = $("#location-message-template").html();
	console.log(27, message.url, message);
	const html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});

	$("#messages").append(html);
	scrollToBottom();
});

$("#message-form").on('submit', function(e){
	const params = $.deparam(window.location.search);
	e.preventDefault();

	const messageTextbox = $('[name=message]');

	socket.emit('createMessage', {
		text: messageTextbox.val()
	}, function(acknowledgement){
		$('[name=message]').val('');
		$('[name=message]').focus();
		console.log('Got it: ', acknowledgement);
	});
});

var locationButton = $("#send-location");
locationButton.on('click', function(e){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text("Sending ...");

	navigator.geolocation.getCurrentPosition(function (position){
		locationButton.removeAttr('disabled').text("Send location");

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function(){
		locationButton.removeAttr('disabled').text("Send location");
		alert('Unable to fetch location.');
	});
});


