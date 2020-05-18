function createFeaturesSectionOfSideMenu() {
    $("#featureContent").empty();
    var title = '<h6 class="m-b-20">Features</h6>';
    var algorithms = initialData["settings"];
    var algorithmLength = algorithms.length;
    var featureOptions = [];
    flag = false;
    for (var i = 0; i < algorithmLength; i++) {
        var algorithmName = algorithms[i]["name"];
        var algorithmLabel = algorithms[i]["label"];
        if (checkTheIfAlgorithmSelected(algorithmName)) {
            features = algorithms[i]["features"];
            var featuresLength = features.length;
            var subTitle = '<p class="m-b-0">' + algorithmLabel + ' Features : </p>';
            featureOptions.push(subTitle);
            for (var j = 0; j < featuresLength; j++) {
                var feature = features[j];
                var featureName = feature["name"];
                var featureLabel = feature['label'];
                var uniqueFeatureName = algorithmName + "-features-" + featureName;
                var featureOption = '<p class="m-b-0">' +
                    '<div class="form-group">' +
                        '<label for="' + uniqueFeatureName + '">' + featureLabel  + '</label>' + 
                        '<input type="text" value="same" class="form-control" name="' + uniqueFeatureName + '" id="' + uniqueFeatureName + '" placeholder="Use Column name as ' + featureLabel  + '">' +
                    '</div>' + 
                '</p>';
                // var featureOption = '<a class="selectedOption" id="' + algorithmName + featureName + '"href="#" onclick="checkWhichPlayerOptionIsClickedOn(this.id)"><i class="fa fa-user-circle"></i> ' + featureName + '</a>';
                featureOptions.push(featureOption);
            }
            flag = true;
        }
    }
    if (flag) {
        var output = title + featureOptions.join('');
    } else{
        var output = title + '<p class="m-b-0">Please Select an Algorithm</p>';
    }
    // output = '<ul>' + output + '</ul>';
    $("#featureContent").append(output);
    checkIfAlgorithmChanges();  
}