function inputToURL(inputElement) {
    var file = inputElement.files[0];
    return window.URL.createObjectURL(file);
}

function createGazePlot() {
    width = 430;
    height = 285;
    $("#gazePlotContent").empty();
    var title = '<h6 class="m-b-20">Gaze Plot</h6>';
    $("#gazePlotContent").append(title);
    graphCopy = JSON.parse(JSON.stringify(graphs));
    var graph =  graphCopy["gazeAndDensity"];
    var reshapeGraph = d3.nest().key(function(d) { return d.algorithm;}).entries(graph);
    console.log("gaze",reshapeGraph.length);
    var data = reshapeGraph[0]["values"];
    var normalisedDataLength = data.length;
    for (var i=0; i < normalisedDataLength; i++ ) {
        data[i]["Scaled_X"] = width * data[i]["Scaled_X"];
        data[i]["Scaled_Y"] = height * data[i]["Scaled_Y"];
    }

    // data = data.slice(0,10);

    console.log("Modelled for Gaze Plot", data);
    
    var imageUrl = inputToURL(document.getElementById('uploadEyeGazeImage'));
    // console.log("Url : ", url);
    // var imageUrl = '<img src="'+ url +'" alt="Italian Trulli">';
    // $("#gazePlotContent").append(imageL);
    // createImage(url);
    var graphContainer = '<div id="gazePlotGraph"></div>';
    $("#gazePlotContent").append(graphContainer);
    var svg = d3.select("#gazePlotGraph")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.append("svg:image")
    .attr("xlink:href", imageUrl)
    .attr("height", "100%")
    .attr("object-fit", "fill")
    .attr("x", 0)
    .attr("y",0);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, width])
        .range([ 0, width ]);
         svg.append("g")
        // .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, height])
        .range([ 0, height]);
    svg.append("g")
        .call(d3.axisRight(y));
    
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Scaled_X); } )
        .attr("cy", function (d) { return y(d.Scaled_Y); } )
        .attr("r", 3)
        .style("fill", "red");

    // Add the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.Scaled_X); })
        .y(function(d) { return y(d.Scaled_Y); })
        );

}