function aggregateUserPreferences() {
    var settings = {};
    $("[name='algorithms[]']:checked").each(function (i) {
        value = $(this).val();
        settings[value] = {};
    });
    console.log("The inputs");
    $('input[name][id][value]').each(function() {
        var inputName = $(this).attr('name');
        var splitInputName = inputName.split("-");
        var lengthSplitInputName = splitInputName.length;
        if (lengthSplitInputName == 3) {
            var inputAlgorithm = splitInputName[0];
            var inputAttribute = splitInputName[1];
            var inputName = splitInputName[2];
            var inputValue = $(this).val();
            // console.log(inputAlgorithm, inputAttribute, inputName, inputValue);
            if (!(inputAttribute in settings[inputAlgorithm])) {
                settings[inputAlgorithm][inputAttribute] = {};
            } 
            settings[inputAlgorithm][inputAttribute][inputName] = inputValue;
        }
        // console.log($(this).attr('name'));
        // console.log($(this).val());
        // console.log($(this).attr('type'));
        // inputTypes.push($(this).attr('type'));
    });
    console.log("Setting");
    console.log(settings);
    settings = JSON.stringify(settings);
    return settings;
}

function submitUserPreferences() {
    $("form#userPreferences").submit(function(e) {
        e.preventDefault();
        var appdir='/submitUserPreferences';
        var formData = new FormData(this);
        var settings = aggregateUserPreferences();
        formData.append('settings', settings);
        $.ajax({
            url:server+appdir,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(response) {
            console.log("ECG Dataset Received");
            console.log(response);
        }); 
    });

    // $.ajax({
    //     type: "POST",
    //     url:server+appdir,
    //     data: {
    //         chosenData : JSON.stringify(chosenData)
    //     },
    //     dataType: 'json'
    // }).done(function(response) {
    //     console.log("ECG Dataset Received");
    //     console.log()
    // });    
}