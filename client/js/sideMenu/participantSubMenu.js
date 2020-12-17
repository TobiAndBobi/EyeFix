// function createFeaturesSectionOfSideMenu(numberOfParticipants) {
//     $("#participantContent").empty();
//     var title = '<h6 class="m-b-20">Participants</h6>';
//     var algorithms = initialData["settings"];
//     var algorithmLength = algorithms.length;
//     var featureOptions = [];
//     flag = false;
//     for (var i = 0; i < algorithmLength; i++) {
//         var algorithmName = algorithms[i]["name"];
//         var algorithmLabel = algorithms[i]["label"];
//         if (checkTheIfAlgorithmSelected(algorithmName)) {
//             features = algorithms[i]["features"];
//             var featuresLength = features.length;
//             var subTitle = '<p class="m-b-0">' + algorithmLabel + ' Features : </p>';
//             featureOptions.push(subTitle);
//             for (var j = 0; j < featuresLength; j++) {
//                 var feature = features[j];
//                 var featureName = feature["name"];
//                 var featureLabel = feature['label'];
//                 var uniqueFeatureName = algorithmName + "-features-" + featureName;
//                 var featureOption = '<p class="m-b-0">' +
//                     '<div class="form-group">' +
//                         '<label for="' + uniqueFeatureName + '">' + featureLabel  + '</label>' + 
//                         '<input type="text" value="same" class="form-control" name="' + uniqueFeatureName + '" id="' + uniqueFeatureName + '" placeholder="Use Column name as ' + featureLabel  + '">' +
//                     '</div>' + 
//                 '</p>';
//                 // var featureOption = '<a class="selectedOption" id="' + algorithmName + featureName + '"href="#" onclick="checkWhichPlayerOptionIsClickedOn(this.id)"><i class="fa fa-user-circle"></i> ' + featureName + '</a>';
//                 featureOptions.push(featureOption);
//             }
//             flag = true;
//         }
//     }
//     if (flag) {
//         var output = title + featureOptions.join('');
//     } else{
//         var output = title + '<p class="m-b-0">Please Select an Algorithm</p>';
//     }
//     // output = '<ul>' + output + '</ul>';
//     $("#featureContent").append(output);
//     checkIfAlgorithmChanges();  
// }

function createParticipantSectionOfSideMenu() {
    $("#participantContent").empty();
    var title = '<h6 class="m-b-20">Participants</h6>';
    var algorithms = initialData["settings"];
    var algorithmLength = algorithms.length;
    if (algorithmLength > 0) {
        var addParticipantButton = '<button type="button" class="btn btn-light" onclick="addParticipant()">Add</button><br>';
        var removeParticipantButton = '<button type="button" class="btn btn-light" onclick="removeParticipant()">Remove</button><br>';
        var addAndRemoveParticipants = '<div class="row"><div class="col-sm-12 col-md-6 col-lg-6">' + addParticipantButton + '</div><div class="col-sm-12 col-md-6 col-lg-6">' + removeParticipantButton + '</div></div>';
        var participantList = '<div id="participantList"></div>';
        $("#participantContent").append(title);
        $("#participantContent").append(addAndRemoveParticipants);
        $("#participantContent").append(participantList);
        addParticipant();
    } else {
        var warningMessage = '<p class="m-b-0">Please Select atleast a single Algorithm to add Participants.</p>';
        var output = title + warningMessage;
        $("#participantContent").append(output);
    }
}

function addParticipant() {   
    // console.log("game over");
    // console.log($("#participantContent participantList"));
    var participantId = ($("#participantList").children().length + 1).toString();
    var subTitle = '<p class="m-b-0">Participant : ' + participantId + '</p>'; 
    var eyeGazeCsvSelection = "uploadeyeGazeCsv" + participantId;
    var eyeGazeCsv = "eyeGazeCsv" + participantId;
    var participantCsvField = '<div class="row">' +
        '<div class="col-sm-12 col-md-6 col-lg-6">' +
            '<span class="input-group-btn">' +
                '<div class="btn btn-default custom-file-uploader">' +
                '<input type="file" class="form-control-file" name="' + eyeGazeCsvSelection + '" id="' + eyeGazeCsvSelection + '" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onchange="this.form.' + eyeGazeCsv +'.value = this.files.length ? this.files[0].name : \'\'"/>' +
                '<p class="participantFileUploadHint">Upload Csv</p>' +
                '</div>' +
            '</span>' +
        '</div>' +
        '<div class="col-sm-12 col-md-6 col-lg-6">' +
            '<input type="text" name="' + eyeGazeCsv + '" class="form-control" placeholder="No selection" readonly>' +
        '</div>' +
    '</div>';
    // var eyeGazeImageSelection = "eyeGazeImageSelection" + participantId;
    // var eyeGazeImage = "eyeGazeImage" + participantId;
    // var participantImageField = '<div class="row">' +
    //     '<div class="col-sm-12 col-md-6 col-lg-6">' +
    //         '<span class="input-group-btn">' +
    //             '<div class="btn btn-default custom-file-uploader">' +
    //             '<input type="file" class="form-control-file" name="' + eyeGazeImageSelection + '" id="' + eyeGazeImageSelection + '" accept="image/*" onchange="this.form.' + eyeGazeImage +'.value = this.files.length ? this.files[0].name : \'\'"/>' +
    //             '<p class="participantFileUploadHint">Upload Image</p>' +
    //             '</div>' +
    //         '</span>' +
    //     '</div>' +
    //     '<div class="col-sm-12 col-md-6 col-lg-6">' +
    //         '<input type="text" name="' + eyeGazeImage + '" class="form-control" placeholder="No selection" readonly>' +
    //     '</div>' +
    // '</div>';
    var group = "participant" + participantId;
    var participant = '<div id="'+ group +'">' + subTitle + participantCsvField + '</div>';
    $("#participantList").append(participant);
    addActiveParticipant();
}

function removeParticipant() {
    if (($("#participantList").children().length) > 0) {
        let participantId = ($("#participantList").children().length).toString();
        let group = "#participant" + participantId;
        $(group).empty();
        $(group).remove();
        removeActiveParticipant();
    }
}