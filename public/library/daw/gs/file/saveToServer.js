"use strict";

gs.file.saveToServer = function (file) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/customSound", true);
    var formData = new FormData();
    formData.append('created', new Date().getTime());
    formData.append("file", file, file.name);
    xhr.send(formData);
}
