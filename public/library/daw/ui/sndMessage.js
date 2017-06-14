"use strict";

ui.initElement("sndMessage", function () {
    return {
        click: function () {
            var message = document.getElementById("message").value;
            if (message != "") {
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
        }
    };
});
