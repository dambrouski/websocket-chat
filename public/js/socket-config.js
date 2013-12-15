define(['socket.io'], function (io) {
    return io.connect('http://localhost:3700');
});