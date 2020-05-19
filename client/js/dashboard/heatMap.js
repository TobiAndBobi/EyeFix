function inputToURL(inputElement) {
    var file = inputElement.files[0];
    return window.URL.createObjectURL(file);
}

function createForEachAlgorithmDensities(svg, x, y, key, data, contourColor) {
      // Prepare a color palette
      var color = d3.scaleLinear()
          .domain([0, 2]) // Points per square pixel.
          .range(["transparent", contourColor]);

    //   // Prepare a color palette
    //   var color2 = d3.scaleLinear()
    //       .domain([0, 2]) // Points per square pixel.
    //       .range(["transparent", ]);
    
      // compute the density data
      var densityData = d3.contourDensity()
        .x(function(d) { return x(d.Scaled_X); })
        .y(function(d) { return y(d.Scaled_Y); })
        .size([width, height])
        .bandwidth(20)
        (data);

        // var densityData2 = d3.contourDensity()
        // .x(function(d) { return x(d.LXpix); })
        // .y(function(d) { return y(d.LYpix); })
        // .size([width, height])
        // .bandwidth(20)
        // (data2);
    
      // show the shape!
      svg.insert("g", "g")
        .selectAll("path")
        .data(densityData)
        .enter().append("path")
          .attr("d", d3.geoPath())
          .attr("fill", function(d) { return color(d.value); });

    //   // show the shape!
    //   svg.insert("g", "g")
    //     .selectAll("path")
    //     .data(densityData2)
    //     .enter().append("path")
    //       .attr("d", d3.geoPath())
    //       .attr("fill", function(d) { return color2(d.value); });
}

function createHeatMap(brushedData=null) {
    width = 430;
    height = 285;
    $("#heatMapContent").empty();
    var title = '<h6 class="m-b-20">Heat Map</h6>';
    $("#heatMapContent").append(title);
    if (brushedData == null) {
        graphCopy = JSON.parse(JSON.stringify(graphs));
    } else{
        graphCopy = JSON.parse(JSON.stringify(brushedData));
    }
    // graphCopy = JSON.parse(JSON.stringify(graphs));
    var graph =  graphCopy["gazeAndDensity"];
    var reshapeGraph = d3.nest().key(function(d) { return d.algorithm;}).entries(graph);
    console.log("Modelled for Heat Map", reshapeGraph);
    var reshapeGraphLength = reshapeGraph.length;
    var allGroup = []; 
    for (var i=0; i < reshapeGraphLength; i++ ) {
        allGroup.push(reshapeGraph[i].key);
        values = reshapeGraph[i].values;
        valuesLength = values.length; 
        for (var j=0; j < valuesLength; j++ ) {
            values[j]["Scaled_X"] = width * values[j]["Scaled_X"];
            values[j]["Scaled_Y"] = height * values[j]["Scaled_Y"];
        }
    }

    // data = data.slice(0,10);

    
    var imageUrl = inputToURL(document.getElementById('uploadEyeGazeImage'));
    // console.log("Url : ", url);
    // var imageUrl = '<img src="'+ url +'" alt="Italian Trulli">';
    // $("#gazePlotContent").append(imageL);
    // createImage(url);
    var graphContainer = '<div id="heatMapGraph"></div>';
    $("#heatMapContent").append(graphContainer);
    var svg = d3.select("#heatMapGraph")
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

    var colors = ["#69b3a2", "red", "blue"];
    console.log(reshapeGraphLength);
    for (var i=0; i < reshapeGraphLength; i++ ) {
        key = reshapeGraph[i].key;
        values = reshapeGraph[i].values;
        createForEachAlgorithmDensities(svg, x, y, key, values, colors[i])
    }
}