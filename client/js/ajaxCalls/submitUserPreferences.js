function submitUserPreferences() {
    $("form#userPreferences").submit(function(e) {
        e.preventDefault();
        var appdir='/submitUserPreferences';
        // var person = selectedOption["competitorPerson"].replace('competitor', '');
        // var session = selectedOption["competitorSession"].replace('competitor', '');
        // var chosenData = {
        //     sport : selectedOption["selectedSport"],
        //     person : person,
        //     CRD : session
        // };    
        var formData = new FormData(this);
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