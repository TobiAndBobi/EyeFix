function createBrushMap() {
    width = 430;
    height = 285;
    $("#brushMapContent").empty();
    var title = '<h6 class="m-b-20">Time Series Brush Map</h6>';
    $("#brushMapContent").append(title);
    var graph = JSON.parse(JSON.stringify(graphs));
    var data =  graph["gazeAndDensity"];
    var normalisedDataLength = data.length;
    for (var i=0; i < normalisedDataLength; i++ ) {
        data[i]["Scaled_X"] = width * data[i]["Scaled_X"];
        data[i]["Scaled_Y"] = height * data[i]["Scaled_Y"];
    }
    // data = data.slice(0,10);

    console.log("Modelled for Brush Map", data);
    
    var graphContainer = '<div id="brushMapGraph"></div>';
    $("#brushMapContent").append(graphContainer);
    var svg = d3.select("#brushMapGraph")
    .append("svg")
      .attr("width", width)
      .attr("height", height);
   

}