var path = require('path');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var moment = require('moment');
var app = express();
// const {generateMessage} = require('./utlis/message');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var generateMessage = (from, text) => {
    return {
      from: from,
      text: text,
      createdAt: moment.valueOf()
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
  // console.log("url: " + `http://www.google.com/maps?q=${latitude}`);
  // console.log("url: " + `http://www.google.com/maps?q=${longitude}`);
  console.log(`${latitude},${longitude}`);
  return {
    from: from,
    url: `http://www.google.com/maps?q=${latitude}`,
    createdAt: moment.valueOf()
  };
};



io.on('connection', (socket) => {
   console.log("A new user connected");

   socket.on('disconnect', (socket) =>{
  	console.log("user disconnected");
   }); 
  
   socket.on('createLocationMessage', function(coords){
    console.log(coords.latitude);
    console.log(coords.longitude);
    io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
   });

   socket.on('createMessage',(message) =>{
    console.log("message " + message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    console.log("this is from server");
   });
});

server.listen(port, () => {
	console.log(`app listening on ${ port }`);
})