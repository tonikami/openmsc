ui.messageListener = function (messageReceived) {
    var username;
    ui.getUser(function (u) {
        username = u;
    })
    var socket = io();
    socket.on('newMessage', function (message) {
        if (username != message.author.username) {
            messageReceived(message);
        }
    });
};
