"use strict";

gs.compositions.initServer = function () {
    getFilesFromServer();
}

function getFilesFromServer() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var resp = JSON.parse(xhr.response);
            resp.sort(function (a, b) {
                return a.created - b.created;
            });
            if (resp.length >= 1) {
                doBlob(resp, 0);
            }
        }
    }
    xhr.open("GET", "/api/customSounds", true);
    xhr.send(null)
}

function doBlob(resp, fileIndex) {
    new Promise(function (resolve, reject) {
        getBlob(resp[fileIndex], function () {
            resolve();
        })
    }).then(function () {
        fileIndex++;
        if (fileIndex != resp.length) {
            doBlob(resp, fileIndex);
        } else {
            getChangesFromServer();
        }
    });
}

function getBlob(fileInfo, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fileInfo.url);
    xhr.responseType = "blob";
    xhr.onload = function (oEvent) {
        var blob = xhr.response;
        if (blob) {
            var file = blobToFile(blob, fileInfo.filename);
            var new_file = gs.file.create(file);
            gs.file.load(new_file, function () {});
            callback();
        }
    };
    xhr.send();
}

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

function getChangesFromServer() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            
            response.reverse().forEach(function (change) {
                gs.change.create(change);
            });
        }
    };

    xmlhttp.open("GET", '/api/changes', true);
    xmlhttp.send();
}