"use strict";

gs.file.getUser = function (callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (this.responseText) {
                var jsonResponse = JSON.parse(this.responseText);
                callback(jsonResponse.username);
            }
        }
    }
    xmlHttp.open("GET", '/api/user', true); // true for asynchronous 
    xmlHttp.send();
}
