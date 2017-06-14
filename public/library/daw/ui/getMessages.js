"use strict";
ui.initElement("getMessages", function () {
    return {
        click: function () {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.responseType = "json";
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var messages = xmlHttp.response;
                    console.log(messages);
                }
            }
            xmlHttp.open("GET", '/api/messages', true); // true for asynchronous 
            xmlHttp.send();
        }
    };
});
