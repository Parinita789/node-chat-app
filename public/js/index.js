var socket = io();
var messageTextBox =  jQuery('[name="message"]');



socket.on('connect', () => {
  console.log("connected to server");

});



socket.on('disconnect', () => {
  console.log("user disconnected");
});
socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');

	console.log("new message ", message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Get My Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    console.log(message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var locationButton = jQuery("#sendLocation");
locationButton.on('click', function(){
  if(!navigator.geolocation){
  	return alert("geolocation is not supported by your browser");
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
  	locationButton.removeAttr('disabled').text('send location');
  	socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
  	});

  }, function(){
  	locationButton.removeAttr('disabled').text('send location');
  	alert('unable to fetch position');
  });
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
  }, function(){
     messageTextBox.val('');
  });
});

