var express = require("express"),
    mongoose = require("mongoose");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.configure('development', function () {
    app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get("/", function (req, res) {
    res.render("bootstrapchat");
});



app.use(express.static(__dirname + '/public'));



var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

mongoose.connect('mongodb://localhost/chat_database');

var Message = new mongoose.Schema({
    message: String,
    username: String
});

var User = new mongoose.Schema({
    username: String
});

var MessageModel = mongoose.model('Message', Message);
var UserModel = mongoose.model('User', User);

io.sockets.on('connection', function (socket) {

    socket.emit('message:create', {
        username: 'Server',
        message: 'welcome to the chat'
    });
    socket.on('message:create', function (data, callback) {
        var message = new MessageModel({
            message: data.message,
            username: data.username
        });
        message.save(function (err) {
            if (!err) {
                io.sockets.emit('messages:create', message);
                callback(null, message);
                return console.log('created');
            } else {
                return console.log(err);
            }
        });
    });

    socket.on('messages:read', function (data, callback) {
        console.log("fetching messages, data received: " + data);
        MessageModel.find({
            username: data.username
        }, function (err, messages) {
            //var messages = []
            if (err) {
                console.error(error);
            } else {
                console.log(messages);
                callback(null, messages);
            }
        });
    });
    
    socket.on('users:read', function (data, callback) {
        console.log("fetching users, data received: " + data);
        UserModel.find({
            username: {'$ne' : data.username}
        }, function (err, users) {
            if (err) {
                console.error(error);
            } else {
                console.log(users);
                callback(null, users);
            }
        });
    });

    socket.on('user:create', function (data, callback) {
        UserModel.findOne({
            username: data.username
        }, function (err, user) {
            if (!err) {
                if (user) {
                    socket.emit('user:create', user);
                } else {
                    console.log("user not found, need to create");
                    
                    var newUser = new UserModel({
                        username: data.username
                    });
                    
                    
                    newUser.save(function (err) {
                        console.log(newUser);
                        if (!err) {
                            socket.broadcast.emit('users:create', newUser);
                            socket.emit('user:create', newUser);
                        } else {
                            console.log(err);
                        }
                       
                    });
                    
                }
            } else {
                console.error(err);
            }
        });
    });
});