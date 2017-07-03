"use strict";

gs.file.messageListener = function (messageReceived) {
    var username;
    gs.file.getUser(function (u) {
        username = u;
    })
    var socket = io();
    socket.on('newMessage', function (message) {
        if (username != message.author.username) {
            messageReceived(message);
        }
    });
};
