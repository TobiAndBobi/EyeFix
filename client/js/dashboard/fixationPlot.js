function inputToURL(inputElement) {
    var file = inputElement.files[0];
    return window.URL.createObjectURL(file);
}

function createFixationPlot(brushedData=null) {
    width = 430 * controlTopGraphSize;
    height = 285 * controlTopGraphSize;
    $("#fixationPlotContent").empty();
    var title = '<h6 class="m-b-20">Fixation Plot</h6>';
    $("#fixationPlotContent").append(title);
    if (brushedData == null) {
        graphCopy = JSON.parse(JSON.stringify(graphs));
    } else{
        graphCopy = JSON.parse(JSON.stringify(brushedData));
    }
    var graph =  graphCopy["fixationPlot"];
    var reshapeGraph = d3.nest().key(function(d) { return d.algorithm;}).entries(graph);
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

    var dataReady = reshapeGraph;
    // var data = reshapeGraph[0]["values"];
    // var normalisedDataLength = data.length;
    // for (var i=0; i < normalisedDataLength; i++ ) {
    //     data[i]["Scaled_X"] = width * data[i]["Scaled_X"];
    //     data[i]["Scaled_Y"] = height * data[i]["Scaled_Y"];
    // }

    // data = data.slice(0,10);

    console.log("Modelled for Fixation Plot", dataReady);
    console.log(allGroup);

    // Reformat the data: we need an array of arrays of {x, y} tuples
    // var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
    //     return {
    //         name: grpName,
    //         values: data.map(function(d) {
    //             return {time: d.time, value: +d[grpName]};
    //         })
    //     };
    // });

    console.log('lol',dataReady);

    var imageUrl = inputToURL(document.getElementById('uploadeyeGazeImage'));
    var graphContainer = '<div id="fixationPlotGraph"></div>';
    $("#fixationPlotContent").append(graphContainer);
    var svg = d3.select("#fixationPlotGraph")
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
        .range(d3.schemeSet2);

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

    console.log(dataReady);
    // Add the lines
    var line = d3.line()
        .x(function(d) { return x(d['Scaled_X']) })
        .y(function(d) { return y(d['Scaled_Y']) })
    svg.selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("d", function(d){ 
            return line(d.values); 
        } )
        .attr("stroke", function(d){ return myColor(d.key); })
        .style("stroke-width", 4)
        .style("fill", "none");

    // Add the points
    svg
        // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.key) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function(d){ return d.values })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d['Scaled_X']) } )
        .attr("cy", function(d) { return y(d['Scaled_Y']) } )
        .attr("r", function(d) {
            if  (d['numberOfPoints'] > 500) {
                return 50;
            } else {
                return d['numberOfPoints'] * 0.1;
            } 
        })
        .attr("stroke", "white")
        .style("opacity", function(d){ 
            if  (d['numberOfPoints'] > 100) {
                return 0.5;
            } else {
                return 1;
            } 
        });

    // Add a legend at the end of each line
    svg
        .selectAll("myLabels")
        .data(dataReady)
        .enter()
        .append('g')
        .append("text")
            .datum(function(d) { return {key: d.key, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", function(d) { return "translate(" + x(d['value']['Scaled_X']) + "," + y(d['value']['Scaled_Y']) + ")"; }) // Put the text at the position of the last point
            .attr("x", 12); // shift the text a bit more right
            // .text(function(d) { return d.key; })
            // .style("fill", function(d){ return myColor(d.key) })
            // .style("font-size", 15);
    
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
        $("#fixationPlotContent").append(graphKeys);
    } else {
        var graphKeys = '<br>' +
        '<p class="m-b-0">The Fixation Plot illustrates time spent starring at a location</p>';
        $("#fixationPlotContent").append(graphKeys);
    }
    // var imageUrl = inputToURL(document.getElementById('uploadEyeGazeImage'));
    // // console.log("Url : ", url);
    // // var imageUrl = '<img src="'+ url +'" alt="Italian Trulli">';
    // // $("#gazePlotContent").append(imageL);
    // // createImage(url);
    // var graphContainer = '<div id="gazePlotGraph"></div>';
    // $("#gazePlotContent").append(graphContainer);
    // var svg = d3.select("#gazePlotGraph")
    // .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    // svg.append("svg:image")
    // .attr("xlink:href", imageUrl)
    // .attr("height", "100%")
    // .attr("object-fit", "fill")
    // .attr("x", 0)
    // .attr("y",0);

    // // Add X axis
    // var x = d3.scaleLinear()
    //     .domain([0, width])
    //     .range([ 0, width ]);
    //      svg.append("g")
    //     // .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));
    
    // // Add Y axis
    // var y = d3.scaleLinear()
    //     .domain([0, height])
    //     .range([ 0, height]);
    // svg.append("g")
    //     .call(d3.axisRight(y));
    
    // // Add dots
    // svg.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function (d) { return x(d.Scaled_X); } )
    //     .attr("cy", function (d) { return y(d.Scaled_Y); } )
    //     .attr("r", 3)
    //     .style("fill", "red");

    // // Add the line
    // svg.append("path")
    //     .datum(data)
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", 1.5)
    //     .attr("d", d3.line()
    //     .x(function(d) { return x(d.Scaled_X); })
    //     .y(function(d) { return y(d.Scaled_Y); })
    //     );

    // Add brushing
    svg
    .call(d3.brush()                 // Add the brush feature using the d3.brush function
        .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        // .on("start brush", updateFixationChart) // Each time the brush selection changes, trigger the 'updateFixationChart' function
        .on("end", fixationBrushended)
    )

    // Function that is triggered when brushing is performed
    function updateFixationChart() {
        extent = d3.event.selection;
        // console.log(extent);
        // console.log(x.invert(extent[0][0]));
        // lol();
        myCircle.classed("selected", function (d) { return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length)) })
    }

    // A function that return TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    }

    function fixationBrushended() {
        if (!d3.event.selection) {
            extent = d3.event.selection;
            createBrushMap();
            // createGazePlot();
            createFixationPlot();
            createHeatMap();
        } else {
            console.log("GG");
            extent = d3.event.selection;
            console.log("Draw new graph");
            // console.log(extent);
            reRenderrBasedOnFixationMap(extent, x, y);
        }
    }

}