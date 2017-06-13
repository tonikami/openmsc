"use strict";

ui.initElement("btnLoginAccount", function () {
    return {
        click: function () {
            var username = ui.dom.lUsername.value;
            var password = ui.dom.lPassword.value;

            var reqParam = {
                username: username,
                password: password,
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var response = xmlHttp.responseText;
                    location.reload();
                }
            }
            xmlHttp.open("POST", '/auth/login', true); // true for asynchronous 
            xmlHttp.setRequestHeader("Content-type", "application/json");
            xmlHttp.send(JSON.stringify(reqParam));
        }
    };
});