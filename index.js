var express = require("express");
var app = express();
var port = 3700;
 
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get("/", function(req, res){
    res.render("page");
});

app.get("/chat", function(req, res){
    res.render("bootstrapchat");
});



app.use(express.static(__dirname + '/public'));



var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('add-user', function (data) {
        console.log('action: add-user ' + data.username);
        io.sockets.emit('add-user', data);
    });
});