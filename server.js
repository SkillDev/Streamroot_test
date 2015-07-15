//Appel à la bibliothèque express
var express = require('express');
//Appel à la bibliothèque de webrtc
var app = express();
//Appel à la bibliothèque http
var server = require('http').Server(app)
;//Appel à la bibliothèque socket.io
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
  res.sendFile(/**/__dirname + '/index.html');
});
//lorsqu'une personne est connecter au server et qu'il est le seul à etre connecter on lui envoie une image.
io.on('connection', function (socket) {
    // on incrément users jusqu'a un maximum de 5 utilisaters 5
    users ++;
    console.log("utilisateur : " + users);
    if (users === 1) {
        //envoie du nom du fichier de l'image par un objet.
        socket.emit('firstconnect', { image: 'Logo-streamroot.png' });
        console.log('image téléchargé depuis le server');
    }
    if (users > 1 && users <= 5){   
      console.log("on prend l'image de " + (users - 1));
    }
    if (users >= 5) {
      
      users = 0;
    }
/*  socket.on('my other event', function (data) {
    console.log(data);
  });*/
});


users = 0;