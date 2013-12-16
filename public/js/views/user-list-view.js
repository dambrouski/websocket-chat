define(['backbone','views/user-item-view'],function(Backbone,UserItemView){
    var UserListView = Backbone.View.extend({
        el: $('#user-list'),
        initialize: function (users) {
            _.bindAll(this, 'render', 'addUser');

            this.users = users;

            // this is called upon fetch
            this.users.bind('reset', this.render);

            // this is called when the collection adds a new todo from the server
            this.users.bind('add', this.addUser);

            this.render();
        },
        render: function () {
            var self = this;

            this.users.each(function (user) {
                self.addUser(user);
            });

            return this;
        },
        addUser: function (user) {
            var tdv = new UserItemView(user);
            $(this.el).append(tdv.el);
        }

    });
    return UserListView;
});