"use strict";

gs.file.sendMessage = function (message) {
    if (message != "") {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {}
        }
        var path = '/api/' + message + '/sendMessage/';
        xmlHttp.open("GET", path, true); // true for asynchronous 
        xmlHttp.send();
    }
}
