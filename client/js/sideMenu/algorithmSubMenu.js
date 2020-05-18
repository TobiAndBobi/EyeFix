function checkWhichSportOptionIsClickedOn(currentChosenSportOption) {
    if (currentChosenSportOption != selectedOption["selectedSport"]) {
        $('#' + selectedOption["selectedSport"]).removeClass("selectedOption");
        selectedOption["selectedSport"]  = currentChosenSportOption;
        $('#' + selectedOption["selectedSport"]).addClass("selectedOption");
        selectedOption["selectedPerson"] = "S1";
        selectedOption["selectedSession"] = "CRD1";
        createPlayersSectionOfSideMenu();
        createSessionSectionOfSideMenu();
    }
}

function createAlgorithmSectionOfSideMenu() {
    var algorithms = initialData["settings"];
    var algorithmLength = algorithms.length;
    var algorithmOptions = [];
    var title = '<h6 class="m-b-20">Algorithms</h6>';
    for (var i = 0; i < algorithmLength; i++) {
        var name = algorithms[i]["name"];
        var label = algorithms[i]["label"];
        if (i == 0) {
            var algorithmOption = '<p class="m-b-0">'+
                '<div class="form-check">' + 
                    '<input class="form-check-input" name="algorithms[]" type="checkbox" checked="checked" value="' + name + '" id="' + name + '">' +
                    '<label class="form-check-label" for="' + name + '">' +
                        label +
                    '</label>' +
                '</div>' +
            '</p>';
        // var sportOption = '<li><a class="selectedOption" id="' + name + '"href="#" onclick="checkWhichSportOptionIsClickedOn(this.id)"><i class="fa fa-male"></i> ' + label + '</a></li>';
        } else{
            var algorithmOption = '<p class="m-b-0">'+
                '<div class="form-check">' + 
                    '<input class="form-check-input" name="algorithms[]" type="checkbox" value="' + name + '" id="' + name + '">' +
                    '<label class="form-check-label" for="' + name + '">' +
                        label +
                    '</label>' +
                '</div>' +
            '</p>';
            // var sportOption = '<li><a id="' + name + '"href="#" onclick="checkWhichSportOptionIsClickedOn(this.id)"><i class="fa fa-male"></i> ' + label + '</a></li>';
        }
        algorithmOptions.push(algorithmOption);
    }
    var output = title + algorithmOptions.join('');
    // output = '<ul>' + output + '</ul>';
    $("#algorithmsContent").append(output); 
}