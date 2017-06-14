"use strict";

ui.initElement("sndMessage", function (message) {
    return {
        click: function () {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    //location.reload();
                    console.log('message sent');
                }
            }
            var path = '/api/' + message + '/sendMessage/';
            xmlHttp.open("GET", path, true); // true for asynchronous 
            xmlHttp.send();
        }
    };
});
