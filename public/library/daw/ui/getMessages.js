"use strict";

ui.initElement("getMessages", function () {
    return {
        click: function () {
            console.loog('test');
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.responseType = "json";
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var messages = xmlHttp.response;
                    console.log("mssagess");
                    //location.reload();
                }
            }
            xmlHttp.open("GET", '/api/messages', true); // true for asynchronous 
            xmlHttp.send();
        }
    };
});
