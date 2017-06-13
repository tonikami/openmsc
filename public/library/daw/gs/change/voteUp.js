gs.change.voteUp = function (change) {
    change.elVoteAmount.textContent = change.itemChangeData.voteAmount++;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Changes Saved');
        }
    };

    xmlhttp.open("GET", '/api/' + change._id +  '/vote/up', true);
    xmlhttp.send();
}