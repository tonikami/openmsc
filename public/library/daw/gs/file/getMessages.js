"use strict";

gs.file.getMessages = function (callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = "json";
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var messages = xmlHttp.response;
            callback(messages.reverse());
        }
    }
    xmlHttp.open("GET", '/api/messages', true); // true for asynchronous 
    xmlHttp.send();
}
