define(['socket-config', 'backbone', 'text!templates/user-save.html', 'collections/messages', 'views/message-list-view', 'collections/users', 'views/user-list-view'], function (socket, Backbone, userSaveTemplate, MessageCollection, MessageListView, UserCollection, UserListView) {
    var UserSaveForm = Backbone.View.extend({
        el: $('#myModal'),
        template: _.template(userSaveTemplate),
        events: {
            "click #save-user-btn": "saveUser",
            "keypress #modal-input-username": "saveUserOnEnter"
        },
        initialize: function () {
            _.bindAll(this, 'render', 'saveUser', 'saveUserOnEnter', 'inputFocus');
            this.render();
            this.$el.modal('show');
            this.inputFocus();

        },
        render: function () {
            this.$el.html(this.template);
            this.delegateEvents();
            return this;
        },
        saveUser: function () {
            $('#username').text(this.$('#modal-input-username').val());
            socket.emit('user:create', {
                username: this.$('#modal-input-username').val()
            });

            var messages = new MessageCollection();
            new MessageListView(messages);

            messages.fetch({
                data: {
                    username: this.$('#modal-input-username').val()
                }
            });
            
            var users = new UserCollection();
            new UserListView(users);
            
            users.fetch({
                data: {
                    username: this.$('#modal-input-username').val()
                }
            });

            this.$el.modal('hide');
        },
        saveUserOnEnter: function (e) {
            if (e.keyCode == 13) {
                this.saveUser();
            }
        },
        inputFocus: function () {
            var self = this;
            $('.modal').on('shown.bs.modal', function () {
                self.$('#modal-input-username').focus();
            });
        }

    });

    return UserSaveForm;
});