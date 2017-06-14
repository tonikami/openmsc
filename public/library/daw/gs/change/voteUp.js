gs.change.voteUp = function (change) {
    if (change.votedUp == undefined) {
        change.totalVotes = change.totalVotes + 1;
        updateServer();
    } else if (change.votedUp) {
        change.totalVotes = change.totalVotes + 2;
        updateServer();
    }

    function updateServer() {
        change.elVoteAmount.textContent = change.totalVotes;
        gs.change.selectedVote(change);
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('Changes Saved');
            }
        };

        xmlhttp.open("GET", '/api/' + change._id + '/vote/up', true);
        xmlhttp.send();
    }
}