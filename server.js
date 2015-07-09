//Appel à la bibliothèque express
var express = require('express');
var app = express();
//Appel à la bibliothèque http
var server = require('http').Server(app);
//Appel à la bibliothèque socket.io
var io = require('socket.io')(server);
// compteur d'utilisateur
var users = 0
app.use(express.static('public'));
// port du server
server.listen(1337, function () {
    console.log("Server launched");
});
// route (la page d'accueil renvoi index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
//lorsq'une personne est connecter au server on lui envoie une image.
io.on('connection', function (socket) {
  // on incrément users jusqu'a un maximum de 5 utilisaters 5
  users ++;
  console.log(users);
  if (users >= 5) {
    users = 0;
  }
  if (users === 1) {
      socket.emit('firstconnect', { image: 'lol.png' });
  }
  socket.on('my other event', function (data) {
    console.log(data);
  });
});










//Appel à la bibliothèque http
/*var http = require('http');
//Appel à la bibliothèque express
var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.send('hello world');
});
app.listen(8080);*/







/*//Création et enregistrement du serveur dans httpServer
httpServer = http.createServer(function (req, result) {
	// Code http succes + type de donnée (dans notre cas une image)
	result.writeHead(200, {"Content-Type": "image/jpeg"});
});
httpServer.listen(8080, function () {
	console.log("Server launched");
});
var socketIo = require('socket.io').listen(httpServer);
socketIo.on('connection', function (socket) {
	console.log('new user');
})*/