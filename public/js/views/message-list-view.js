define(['backbone', 'views/message-item-view'], function (Backbone,MessageItemView) {
    var MessageListView = Backbone.View.extend({
        el: $('#chatDiv'),
        initialize: function (messages) {
            _.bindAll(this, 'render', 'addMessage');

            this.messages = messages;

            // this is called upon fetch
            this.messages.bind('reset', this.render);

            // this is called when the collection adds a new todo from the server
            this.messages.bind('add', this.addMessage);

            this.render();
        },
        render: function () {
            var self = this;

            this.messages.each(function (message) {
                self.addMessage(message);
            });

            return this;
        },
        addMessage: function (message) {
            var tdv = new MessageItemView(message);
            this.$('#chatTable > tbody:last').append(tdv.el);

            $(this.el).scrollTop($(this.el)[0].scrollHeight);
        }

    });
    return MessageListView;
});