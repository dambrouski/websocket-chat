define(['backbone', 'socket-config', 'models/user'], function (Backbone, socket, User) {
    var UserCollection = Backbone.Collection.extend({
        model: User,
        url: 'users',
        socket: socket,
        initialize: function () {
            _.bindAll(this, 'serverCreate');
            this.ioBind('create', this.serverCreate, this);
        },
        serverCreate: function (data) {
            var exists = this.get(data.id);
            if (!exists) {
                this.add(data);
            } else {
                data.fromServer = true;
                exists.set(data);
            }
        },
        collectionCleanup: function (callback) {
            this.ioUnbindAll();
            this.each(function (model) {
                model.modelCleanup();
            });
            return this;
        }
    });
    return UserCollection;
});