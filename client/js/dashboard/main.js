// $("#uploadEyeGazeImage").change(function(e) {

//     for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
//         var file = 
//         uploadedImageFile = e.originalEvent.srcElement.files[i];
//         var img = document.createElement("img");
//         var reader = new FileReader();
//         reader.onloadend = function() {
//             img.src = reader.result;
//             img.id = "lol";
//         }
//         reader.readAsDataURL(file);
//         $("input").after(img);
//     }
// });

function dashboard() {
    createGazePlot();
    createFixationPlot(); 
    createHeatMap();
    // createOrganisationSectionOfSideMenu();
    // createAlgorithmSectionOfSideMenu();
    // createFeaturesSectionOfSideMenu();
    // createParametersSectionOfSideMenu();
    // createSessionSectionOfSideMenu();
}