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

function reRenderrBasedOnFixationMap(extendArr, x, y){
    let width = 430;
    let height = 285;
    // console.log("first-x",x.invert(extent[0][0]));
    // console.log("first-y",y.invert(extent[0][1]));
    // console.log("second-x",x.invert(extent[1][0]));
    // console.log("second-y",y.invert(extent[1][1]));
    let graphCopy = JSON.parse(JSON.stringify(graphs));
    let data = {};
    let gad  = graphCopy["gazeAndDensity"];
    let gadlength = gad.length;
    data["gazeAndDensity"]=[];
    gazTime = [];
    for(extent of extendArr){
        if (extent != null){
            var x1 = x.invert(extent[0][0]) / width;
            var x2 = x.invert(extent[1][0]) / width;
            var xmin = null;
            var xmax = null;
            if (x1>x2){
                xmin = x2;
                xmax = x1;
            }else{
                xmin = x1;
                xmax = x2;
            }
            var y1 = y.invert(extent[0][1]) / height;
            var y2 = y.invert(extent[1][1]) / height;
            var ymin = null;
            var ymax = null;
            if (y1>y2){
                ymin = y2;
                ymax = y1;
            }else{
                ymin = y1;
                ymax = y2;
            }
            console.log(xmin, xmax, ymin, ymax)
            for(let i =0; i < gadlength;i++){
                var time_gaze = gad[i]["Time"];
                if(gad[i]["Scaled_X"]>= xmin && gad[i]["Scaled_X"]<= xmax && gad[i]["Scaled_Y"]>= ymin && gad[i]["Scaled_Y"]<= ymax && !(gazTime.includes(time_gaze))) {
                    data["gazeAndDensity"].push(gad[i]);
                    gazTime.push(time_gaze);
                }
            }
        }
    }
    createHeatMap(data);
    createBrushMap(data);

}

function reRenderBasedOnHeatMap(extendArr,x,y) {
    let width = 430;
    let height = 285;
    // console.log("first-x",x.invert(extent[0][0]));
    // console.log("first-y",y.invert(extent[0][1]));
    // console.log("second-x",x.invert(extent[1][0]));
    // console.log("second-y",y.invert(extent[1][1]));
    let graphCopy = JSON.parse(JSON.stringify(graphs));
    // console.log(graphCopy)
    let fixation  = graphCopy["fixationPlot"];
    let fixationlength = fixation.length;
    let data = {};
    data["fixationPlot"]=[];
    let gad  = graphCopy["gazeAndDensity"];
    let gadlength = gad.length;
    data["gazeAndDensity"]=[];
    var fix_time = [];
    var gaz_time = [];
    for(extent of extendArr){
        var x1 = x.invert(extent[0][0]) / width;
        var x2 = x.invert(extent[1][0]) / width;
        var xmin = null;
        var xmax = null;
        if (x1>x2){
            xmin = x2;
            xmax = x1;
        }else{
            xmin = x1;
            xmax = x2;
        }
        var y1 = y.invert(extent[0][1]) / height;
        var y2 = y.invert(extent[1][1]) / height;
        var ymin = null;
        var ymax = null;
        if (y1>y2){
            ymin = y2;
            ymax = y1;
        }else{
            ymin = y1;
            ymax = y2;
        }
        console.log(xmin, xmax, ymin, ymax);
        // console.log("Check this : ",graphCopy["fixationPlot"]);
        for(let i =0; i < fixationlength;i++){
            var time_ex = fixation[i]["Time"];
            if(fixation[i]["Scaled_X"]>= xmin && fixation[i]["Scaled_X"]<= xmax && fixation[i]["Scaled_Y"]>= ymin && fixation[i]["Scaled_Y"]<= ymax && !(fix_time.includes(time_ex))){
                data["fixationPlot"].push(fixation[i]);
                fix_time.push(time_ex);
            }
        }
        for(let i =0; i < gadlength;i++){
            var time_gaze = gad[i]["Time"];
            if(gad[i]["Scaled_X"]>= xmin && gad[i]["Scaled_X"]<= xmax && gad[i]["Scaled_Y"]>= ymin && gad[i]["Scaled_Y"]<= ymax && !(gaz_time.includes(time_gaze))) {
                data["gazeAndDensity"].push(gad[i]);
                gaz_time.push(time_gaze);
            }
        }
    }
    // console.log(graphCopy);
    // console.log(data);
    // createGazePlot(data);
    createFixationPlot(data);
    createBrushMap(data);

}



function newMultiBrushRerender(mySelections,time_dict){
    var data = {};
    data["fixationPlot"]=[];
    data["gazeAndDensity"]=[];
    var fix_time = [];
    var gaz_time = [];
    var graphCopy = JSON.parse(JSON.stringify(graphs));
    for (var [key, value] of Object.entries(mySelections)){
        // console.log(key,value);
        x1 = value["start"];
        x2 = value["end"];
        console.log(x1,x2)
        if (x1>x2){
            var xmin = x2;
            var xmax = x1;
        }else{
            var xmin = x1;
            var xmax = x2;
        }
        fixation  = graphCopy["fixationPlot"];
        fixationlength = fixation.length;
        
        for(var i =0; i < fixationlength;i++){
            var time_ex = fixation[i]["Time"];
            if(time_ex>= (xmin+time_dict[fixation[i]["algorithm"]]["min_time"]) && time_ex<= xmax + (time_dict[fixation[i]["algorithm"]]["min_time"]) && !(fix_time.includes(time_ex))){
                data["fixationPlot"].push(fixation[i]);
                fix_time.push(time_ex);
            }
        }
        gad  = graphCopy["gazeAndDensity"];
        gadlength = gad.length;
        for(var i =0; i < gadlength;i++){
            var time_gaze = gad[i]["Time"];
            if(time_gaze>= (xmin+time_dict[gad[i]["algorithm"]]["min_time"]) && time_gaze<= xmax + (time_dict[gad[i]["algorithm"]]["min_time"]) && !(gaz_time.includes(time_gaze))){
                data["gazeAndDensity"].push(gad[i]);
                gaz_time.push(time_gaze);
            }
        }
    }
    console.log(data);
    // createGazePlot(data);
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

// To capture and render user selected participants
activeParticipantCheckboxListener();