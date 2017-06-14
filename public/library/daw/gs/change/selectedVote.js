gs.change.selectedVote = function (change) {
    if (change.votedUp != undefined) {
        if (change.votedUp) {
            change.elVoteUp.classList.add('selected');
        } else {
            change.elVoteDown.classList.add('selected');
        }
    }
}