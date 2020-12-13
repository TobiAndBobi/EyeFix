function createParametersSectionOfSideMenu() {
    $("#parameterContent").empty();
    var title = '<h6 class="m-b-20">Hyperparameters</h6>';
    var algorithms = initialData["settings"];
    var algorithmLength = algorithms.length;
    var parameterOptions = [];
    flag = false;
    for (var i = 0; i < algorithmLength; i++) {
        var algorithmName = algorithms[i]["name"];
        var algorithmLabel = algorithms[i]["label"];
        if (checkTheIfAlgorithmSelected(algorithmName)) {
            parameters = algorithms[i]["parameters"];
            var parametersLength = parameters.length;
            var subTitle = '<p class="m-b-0">' + algorithmLabel + ' Parameters : </p>';
            parameterOptions.push(subTitle);
            for (var j = 0; j < parametersLength; j++) {
                var parameter = parameters[j];
                var parameterName = parameter["name"];
                var parameterLabel = parameter['label'];
                var parameterValue = parameter['value'];
                var uniqueParameterName = algorithmName + "-parameters-" + parameterName;
                var parameterOption = '<p class="m-b-0">' +
                    '<div class="form-group">' +
                        '<label for="' + uniqueParameterName + '">' + parameterLabel  + '</label>' + 
                        '<input type="number" value="' + parameterValue  + '" class="form-control" name="' + uniqueParameterName + '" id="' + uniqueParameterName + '" placeholder="' + parameterValue  + '">' +
                    '</div>' + 
                '</p>';
                // var parameterOption = '<a class="selectedOption" id="' + algorithmName + parameterName + '"href="#" onclick="checkWhichPlayerOptionIsClickedOn(this.id)"><i class="fa fa-user-circle"></i> ' + parameterName + '</a>';
                parameterOptions.push(parameterOption);
            }
            flag = true;
        }
    }
    if (flag) {
        var output = title + parameterOptions.join('');
    } else{
        var output = title + '<p class="m-b-0">Please Select an Algorithm</p>';
    }
    // output = '<ul>' + output + '</ul>';
    $("#parameterContent").append(output);
    checkIfAlgorithmChanges();  
}