function inputToURL(inputElement) {
    var file = inputElement.files[0];
    return window.URL.createObjectURL(file);
}

function createGazePlot(brushedData=null) {
    width = 430 * controlTopGraphSize;
    height = 285 * controlTopGraphSize;
    // width = controlTopGraphWidth;
    // height = controlTopGraphHeight;
    $("#gazePlotContent").empty();
    var title = '<h6 class="m-b-20">Gaze Plot</h6>';
    $("#gazePlotContent").append(title);
    if (brushedData == null) {
        graphCopy = JSON.parse(JSON.stringify(graphs));
    } else{
        graphCopy = JSON.parse(JSON.stringify(brushedData));
    }
    var graph =  graphCopy["gazeAndDensity"];

    var neededFixationTraces = ["algorithm1 - participant1", "algorithm1 - participant2", "algorithm1 - participant3"];

    var reshapeGraph = d3.nest().key(function(d) { return d.algorithm;}).entries(graph);
    console.log("The Keys for gaze",Object.keys(reshapeGraph));
    console.log(reshapeGraph);
    var reshapeGraphLength = reshapeGraph.length;
    console.log("gaze",reshapeGraph.length);
    var allGroup = []; 
    // var data = reshapeGraph[0]["values"];
    // var normalisedDataLength = data.length;
    // for (var i=0; i < normalisedDataLength; i++ ) {
    //     data[i]["Scaled_X"] = width * data[i]["Scaled_X"];
    //     data[i]["Scaled_Y"] = height * data[i]["Scaled_Y"];
    // }

    var copyReshapeGraph = [];
    for (var i=0; i < reshapeGraphLength; i++ ) {
        if (neededFixationTraces.includes(reshapeGraph[i].key)) {
            allGroup.push(reshapeGraph[i].key);
            values = reshapeGraph[i].values;
            valuesLength = values.length; 
            for (var j=0; j < valuesLength; j++ ) {
                values[j]["Scaled_X"] = width * values[j]["Scaled_X"];
                values[j]["Scaled_Y"] = height * values[j]["Scaled_Y"];
            }
            copyReshapeGraph.push(reshapeGraph[i]);
        }
    }

    reshapeGraph = copyReshapeGraph;

    // data = data.slice(0,10);

    // console.log("Modelled for Gaze Plot", data);
    console.log("Modelled for Gaze Plot", reshapeGraph);
    
    var imageUrl = inputToURL(document.getElementById('uploadeyeGazeImage'));
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

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(colorSchemeEyeTrace);
        
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


    for(var i=0; i < reshapeGraph.length; i++) {
        if (neededFixationTraces.includes(reshapeGraph[i].key)) {
            let data = reshapeGraph[i]["values"];

            // Add dots
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.Scaled_X); } )
            .attr("cy", function (d) { return y(d.Scaled_Y); } )
            .attr("r", 3)
            .style("fill", myColor(allGroup[i]))
            .style("opacity", 0.5);

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke",  myColor(allGroup[i]))
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                .x(function(d) { return x(d.Scaled_X); })
                .y(function(d) { return y(d.Scaled_Y); })
                );
        }
    }    

    if (allGroup.length > 0) {
        console.log("allGroup Length", allGroup.length);
        let keyMap =  [];
        for (var i=0; i < allGroup.length; i++) {
            console.log(myColor(allGroup[i]));
            singleKey = '<span class="box" style="background-color:' + myColor(allGroup[i]) + ' ;">' + allGroup[i] + '</span>';
            keyMap.push(singleKey);
        }
        var graphKeys = '<br><div class="keyMappingBox"><p class="m-b-0">' + keyMap.join('') + '</p></div>';
        // var graphKeys = '<br>' +
        // '<p class="m-b-0"><div><div class="box green"></div>' + allGroup[0] + '</div></p>' +
        // '<p class="m-b-0"><div><div class="box orange"></div>' + allGroup[1] + '</div></p>';
        $("#gazePlotContent").append(graphKeys);
    } else {
        var graphKeys = '<br>' +
        '<p class="m-b-0">The Gaze Plot illustrates the movement of ones eyes from one place to the next</p>';
        $("#gazePlotContent").append(graphKeys);
    }

}