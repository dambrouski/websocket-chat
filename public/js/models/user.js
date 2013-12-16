define(['backbone','socket-config'], function (Backbone, socketIO) {
    var User = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: 'user',
        noIoBind: false,
        socket: socketIO,
        initialize: function () {
            _.bindAll(this, 'modelCleanup');
        },
        modelCleanup: function () {
            this.ioUnbindAll();
            return this;
        }
    });
    return User;
});