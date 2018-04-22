var path = require('path');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var app = express();

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
   console.log("A new user connected");

socket.on('disconnect', (socket) =>{
	console.log("user disconnected");
})   
});
server.listen(port, () => {
	console.log(`app listening on ${ port }`);
})