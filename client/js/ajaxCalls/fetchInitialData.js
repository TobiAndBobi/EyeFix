function fetchInitialData() {
    var appdir='/fetchInitialData';
    $.ajax({
        type: "POST",
        url:server+appdir,
        dataType: 'json'
    }).done(function(response) { 
        initialData = response;
        console.log("Initial Data Obtained");
        console.log(initialData);
        // createSideMenu();
    });       
}