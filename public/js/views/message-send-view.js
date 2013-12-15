define(['backbone', 'models/message', 'text!templates/message-send.html'], function (Backbone, Message, messageSendTemplate) {
    var MessageSendView = Backbone.View.extend({
        el: $('#send-message'),
        template: _.template(messageSendTemplate),
        events: {
            "click #send": "sendMessage",
            "keypress #field": "sendMessageOnEnter",
        },
        initialize: function () {
            _.bindAll(this, 'render', 'sendMessage', 'sendMessageOnEnter');
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            this.delegateEvents();
            return this;
        },
        sendMessage: function () {
            var MessageNoIOBind = Message.extend({
                noIoBind: true
            });
            var attrs = {
                message: this.$('#field').val(),
                username: $('#username').text()
            };

            var message = new MessageNoIOBind(attrs);
            message.save();

            this.$('#field').val("");
        },
        sendMessageOnEnter: function (e) {
            if (e.keyCode == 13) {
                this.sendMessage();
            }
        }
    });
    return MessageSendView;
});