gs.change.selectedVote = function (change) {
    if (change.votedUp != undefined) {
        if (change.votedUp) {
            change.elVoteDown.classList.remove('selected');
            change.elVoteUp.classList.add('selected');
        } else {
            change.elVoteDown.classList.add('selected');
            change.elVoteUp.classList.remove('selected');
        }
    }
}