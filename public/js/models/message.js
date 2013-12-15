define(['backbone', 'socket-config'], function (Backbone, socketIO) {
    var Message = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: 'message',
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
    return Message;
});