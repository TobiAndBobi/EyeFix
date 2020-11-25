function createActiveParticipantSectionOfTopMenu() {
    let activeParticipantSelectionSubMenu =  "#activeParticipantSelectionSubMenu";
    $(activeParticipantSelectionSubMenu).empty(); 
    var participantId = ($("#participantList").children().length).toString();
    var participant =  "activeParticipant" + participantId; 
    var participantBlock =  "participantBlock" + participantId;
    var labelParticipant = "Participant : "  + participantId;
    var activeParticipantOption = '<div id="' + participantBlock + '"><p class="m-b-0">' +
        '<div class="form-check">' + 
            '<input class="form-check-input" name="activeParticipants[]" type="checkbox" checked="checked" value="' + participant + '" id="' + participant + '">' +
            '<label class="form-check-label" for="' + participant + '">' +
                labelParticipant +
            '</label>' +
        '</div>' +
    '</p></div>&nbsp;';
    $(activeParticipantSelectionSubMenu).append(activeParticipantOption); 
}

function addActiveParticipant() { 
    let activeParticipantSelectionSubMenu =  "#activeParticipantSelectionSubMenu";
    var participantId = ($("#participantList").children().length).toString();
    var participant =  "activeParticipant" + participantId; 
    var participantBlock =  "participantBlock" + participantId; 
    var labelParticipant = "Participant : "  + participantId;
    var activeParticipantOption = '<div id="' + participantBlock + '"><p class="m-b-0">' +
        '<div class="form-check">' + 
            '<input class="form-check-input" name="activeParticipants[]" type="checkbox" checked="checked" value="' + participant + '" id="' + participant + '">' +
            '<label class="form-check-label" for="' + participant + '">' +
                labelParticipant +
            '</label>' +
        '</div>' +
    '</p></div>&nbsp;';
    $(activeParticipantSelectionSubMenu).append(activeParticipantOption);
}

function removeActiveParticipant() { 
    if (($("#activeParticipantSelectionSubMenu").children().length) > 0) {
        var participantId = ($("#activeParticipantSelectionSubMenu").children().length).toString();
        let participantBlock =  "#participantBlock" + participantId;
        console.log(participantBlock); 
        $(participantBlock).empty();
        $(participantBlock).remove();
    }
}

function activeParticipantCheckboxListener() {
    $(document).on("change", "input:checkbox[name='activeParticipants[]']", function () {
        if($(this).is(':checked')){
            console.log($("input[name='activeParticipants[]'][id][value]"));
        } else {
            console.log('un-checked');
        }
        var graphCopy = JSON.parse(JSON.stringify(graphs));
        console.log(graphCopy);
        $("[name='activeParticipants[]']:checked").each(function (i) {
            value = $(this).val();
            console.log(value);
        });
        participantSelection();
    });
}

function participantSelection() {
    if (Object.keys(graphs).length != 0) {
        let participantIds = [];
        $("[name='activeParticipants[]']:checked").each(function (i) {
            participantIds.push($(this).val().match(/\d+/)[0]);
        });
        console.log(participantIds);
        var data = {};
        data["fixationPlot"]=[];
        data["gazeAndDensity"]=[];
        let graphCopy = JSON.parse(JSON.stringify(graphs));
        
        fixation  = graphCopy["fixationPlot"];
        fixationlength = fixation.length;
        for(var i =0; i < fixationlength;i++) {
            var splitAlgorithimName = fixation[i]["algorithm"].split("-");
            let participantId = splitAlgorithimName[1].match(/\d+/)[0];
            if(participantIds.includes(participantId)) {
                data["fixationPlot"].push(fixation[i]);
            }
        }

        gad  = graphCopy["gazeAndDensity"];
        gadlength = gad.length;
        for(var i =0; i < gadlength;i++){
            var splitAlgorithimName = gad[i]["algorithm"].split("-");
            let participantId = splitAlgorithimName[1].match(/\d+/)[0];
            if(participantIds.includes(participantId)) {
                data["gazeAndDensity"].push(gad[i]);
            }
        }
        console.log(data);
        createGazePlot(data);
        createFixationPlot(data); 
        createHeatMap(data);
    }
}