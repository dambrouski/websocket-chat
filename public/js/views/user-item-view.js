define(['backbone', 'text!templates/user-item.html'], function (Backbone, userItemTemplate) {
    var UserItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: _.template(userItemTemplate),
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
    return UserItemView;
});