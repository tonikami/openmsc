"use strict";

ui.initElement("btnLogout", function () {
    return {
        click: function () {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    location.reload();
                }
            }
            xmlHttp.open("GET", '/auth/logout', true); // true for asynchronous 
            xmlHttp.send();
        }
    };
});