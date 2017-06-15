"use strict"

gs.file.assign = function( that ) {
    $("#assignModal").modal();
    $("#lFileID").val(that.id);
    return false;
};