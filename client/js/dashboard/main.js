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

function reRenderTheMainGraphs(extent,x,y) {
    console.log("first-x",x.invert(extent[0][0]));
    console.log("first-y",y.invert(extent[0][1]));
    console.log("second-x",x.invert(extent[1][0]));
    console.log("second-y",y.invert(extent[1][1]));
    graphCopy = JSON.parse(JSON.stringify(graphs));
    // console.log(graphCopy)
    var x1 = x.invert(extent[0][0]);
    var x2 = x.invert(extent[1][0]);
    if (x1>x2){
        var xmin = x2;
        var xmax = x1;
    }else{
        var xmin = x1;
        var xmax = x2;
    }
    fixation  = graphCopy["fixationPlot"];
    fixationlength = fixation.length;
    var data = {};
    data["fixationPlot"]=[];
    for(var i =0; i < fixationlength;i++){
        if(fixation[i]["Time"]>= xmin && fixation[i]["Time"]<= xmax){
            data["fixationPlot"].push(fixation[i]);
        }
    }
    gad  = graphCopy["gazeAndDensity"];
    gadlength = gad.length;
    // var data = {}
    data["gazeAndDensity"]=[];
    for(var i =0; i < gadlength;i++){
        if(gad[i]["Time"]>= xmin && gad[i]["Time"]<= xmax){
            data["gazeAndDensity"].push(gad[i]);
        }
    }
    console.log(graphCopy);
    console.log(data);
    createGazePlot(data);
    createFixationPlot(data); 
    createHeatMap(data);
    


}

function dashboard() {
    createGazePlot();
    createFixationPlot(); 
    createHeatMap();
    createBrushMap();
    // createOrganisationSectionOfSideMenu();
    // createAlgorithmSectionOfSideMenu();
    // createFeaturesSectionOfSideMenu();
    // createParametersSectionOfSideMenu();
    // createSessionSectionOfSideMenu();
}