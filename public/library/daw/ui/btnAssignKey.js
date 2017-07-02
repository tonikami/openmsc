"use strict";

ui.initElement("btnAssignKey", function () {
    return {
        click: function () {
            console.log("Bye bye modal");
            $("#assignModal").modal("hide");
            gs.numberKeys.assign($("#lKey").val(), $("#lFileID").val(), $("#lTrack").val()-1);
            $('.keyDetails').each(function(i, obj) {
                if (i == $("#lFileID").val()) {
                    obj.innerHTML = "Key: " + $("#lKey").val() + " | Track: " + $("#lTrack").val();
                    return;
                }
            });
        }
    };
});