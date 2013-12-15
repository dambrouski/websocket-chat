require.config({
    paths: {
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone',
        'socket.io': 'lib/socket.io',
        'jquery.bootstrap': 'lib/bootstrap',
        'backbone.iobind': 'lib/backbone.iobind',
        'backbone.iosync': 'lib/backbone.iosync'
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
        },
        'backbone.iobind': {
            deps: ["jquery", "underscore","backbone"]
        },
        'backbone.iosync': {
            deps: ["jquery", "underscore", "backbone", "backbone.iobind"]
        }
    }
});


require(['socket-config', 'jquery.bootstrap', 'backbone', 'underscore', 'jquery', 'backbone.iobind', 'backbone.iosync',
            'views/message-send-view','views/user-save-form-view'],
    function (socket, jqueryBootstrap, Backbone, _, $, backbone_iobind, backbone_iosync, MessageSendView, UserSaveForm) {

        var users = [];
        var User = Backbone.Model.extend({});

        var UserCollection = Backbone.Collection.extend({});

        var UserListView = Backbone.View.extend({});
        var UserItemView = Backbone.View.extend({});

        var App = Backbone.Router.extend({
            routes: {
                '': 'index',
                '/': 'index'
            },
            index: function () {

                new UserSaveForm();
                new MessageSendView();

            }
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



        $(function () {

            new App();
            Backbone.history.start();

        });
    });