gs.change.create = function (change) {
    change.itemChangeData = {
        blocksAmount: change.blocks.length,
        username: change.creator.username,
        voteAmount: change.totalVotes
    }
    change.samples = [];

    change.elChange = ui.createHTML(Handlebars.templates.itemChange(change.itemChangeData))[0];
    ui.dom.changesList.appendChild(change.elChange);

    change.elVoteUp = change.elChange.querySelector("#voteUp");
    change.elVoteDown = change.elChange.querySelector("#voteDown");
    change.elVoteAmount = change.elChange.querySelector("#voteAmount");

    change.elVoteUp.onclick = gs.change.voteUp.bind(null, change);
    change.elVoteDown.onclick = gs.change.voteDown.bind(null, change);
    change.elChange.onclick = function () {
        if (gs.selectedChange) {
            gs.selectedChange.elChange.classList.remove('active');
        }
        gs.samples.selected.unselect();
        
        gs.selectedChange = change;
        change.elChange.classList.add("active");
        change.samples.forEach(function (sample) {
            gs.sample.select(sample, true);
        })
    }


    change.blocks.forEach(function (sampleData) {
        buildSample(sampleData);
    });

    function buildSample(sampleData) {
        var smp = gs.sample.create(gs.files[sampleData.file], {
            new: false
        });
        smp.data.gsfile.samplesToSet.push(smp);
        gs.sample.inTrack(smp, sampleData.track);
        gs.sample.when(smp, sampleData.when / ui.BPMem);
        gs.sample.slip(smp, sampleData.slip / ui.BPMem);
        gs.sample.duration(smp, sampleData.duration / ui.BPMem);
        gs.composition.add(smp);
        change.samples.push(smp);
    }
}