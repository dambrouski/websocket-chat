require.config({
    paths: {
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone',
        'socket.io': 'lib/socket.io',
        'jquery.bootstrap': 'lib/bootstrap'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery.bootstrap': {
            deps: ['jquery']
        },
        'socketio': {
            exports: 'io'
        }
    }
});


require(['socket.io', 'jquery.bootstrap', 'backbone', 'underscore', 'jquery'], function (io, jqueryBootstrap, Backbone, _, $) {
    $(function () {

        //Create user list views
        //Create Chat views
        
        var messages = [];
        var users = [];
        var socket = io.connect('http://localhost:3700');
        var field = document.getElementById("field");
        var sendButton = document.getElementById("send");
        //var content = document.getElementById("content");
        var name = document.getElementById("name");
        var chatTable = document.getElementById("chatTable");

        $('#myModal').modal('show');

        $('#saveUserName').on('click', function () {
            $('#username').text($('#modal-input-username').val());
            socket.emit('add-user', {
                username: $('#modal-input-username').val()
            });
            $('#myModal').modal('hide');
        });

        socket.on('user:create', function (data) {
            if (data.username) {
                $('#user-list').empty();
                users.push(data);
                var html = '';
                for (var i = 0; i < users.length; i++) {
                    $('#user-list').append('<li class="list-group-item"> <span class="glyphicon glyphicon-user"></span> ' + users[i].username + '</li>');
                }
            } else {
                console.log("There is a problem:", data);
            }
        });

        socket.on('message:create', function (data) {
            if (data.message) {
                $('#chatTable > tbody').empty();
                messages.push(data);
                var html = '';
                for (var i = 0; i < messages.length; i++) {
                    html += '<tr>';
                    html += '<td>' + (messages[i].username ? messages[i].username : 'Server') + '</td>';
                    html += '<td>' + messages[i].message + '</td>';
                    html += '</tr>';
                }
                $('#chatTable > tbody:last').append(html);
            } else {
                console.log("There is a problem:", data);
            }
        });

        sendButton.onclick = function () {
            var text = field.value;
            socket.emit('message:create', {
                message: text,
                username: $('#username').text()
            });
            field.value = "";
        };

    });
});