"use strict";

ui.initElement("btnCreateAccount", function () {
    return {
        click: function () {
            var username = ui.dom.rUsername.value;
            var email = ui.dom.rEmail.value;
            var password = ui.dom.rPassword.value;

            var reqParam = {
                username: username,
                password: password,
                email: email
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var response = xmlHttp.responseText;
                    location.reload();
                }
            }
            xmlHttp.open("POST", '/auth/signup', true); // true for asynchronous 
            xmlHttp.setRequestHeader("Content-type", "application/json");
            xmlHttp.send(JSON.stringify(reqParam));
        }
    };
});