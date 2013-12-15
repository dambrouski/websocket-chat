define(['backbone', 'text!templates/message-item.html'], function (Backbone, messageItemTemplate) {
    var MessageItemView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template(messageItemTemplate),
        initialize: function (model) {
            _.bindAll(this, 'render');
            this.model = model;
            this.render();
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return MessageItemView;
});