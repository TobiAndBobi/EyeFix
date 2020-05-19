function test(value, finalSettingsLength){
    if (finalSettingsLength == 1) {
        return 1;
    } else {
        if (value == "algorithm1"){
            // console.log("lol")
            return 1;
        }
        else{
            return 2;
        }
    }
}
function createBrushMap() {

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 1400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // width = 330;
    // height = 100;        

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

    var checkCount = JSON.parse(finalSettings);
    var finalSettingsLength = Object.keys(checkCount).length;
    console.log("final length", finalSettingsLength);
    console.log(finalSettings);
    // append the svg object to the body of the page
    var svg = d3.select("#brushMapGraph")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // var svg = d3.select("#brushMapGraph")
    // .append("svg")
    // .attr("width", width)
    // .attr("height", height);

    var x = d3.scaleLinear()
      .domain([2960950, 3005934])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
    // Add Y axis
    // var y = d3.scaleLinear()
    //     .domain([d3.min(data, function(d) { return d["signal"] }), d3.max(data, function(d) { return d["signal"] })])
    //     .range([ height, 0])
    //     .nice();
    // svg.append("g")
    //     .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
    //     .select(".domain").remove();

    var y = d3.scaleLinear()
      .domain([0, finalSettingsLength])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y).ticks(finalSettingsLength));


    var color = d3.scaleOrdinal()
        .domain([1, 2, "virginica" ])
        .range([ "#440154ff",  "#fde725ff","#21908dff"]);
    var myCircle = svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function (d) { return x(d["Time"]); } )
        .attr("y", function (d) { return y(test(d["algorithm"], finalSettingsLength)); } )
        .attr("width", 3)
        .attr("height", 30)
        .style("fill", function (d) { return color(d["label"]) } )
        .style("opacity", 0.5);
    
    
    // Add brushing
    svg
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
        .on("end", brushended)
    )
    // function lol() {
    //     console.log("lol");
    // }

    // Function that is triggered when brushing is performed
    function updateChart() {
        extent = d3.event.selection;
        // console.log(extent);
        // console.log(x.invert(extent[0][0]));
        // lol();
        myCircle.classed("selected", function(d){ return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length) ) } )
    }

    // A function that return TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    }

    function brushended() {
        if (!d3.event.selection) {
            extent = d3.event.selection;
            console.log("fucked");
            createGazePlot();
            createFixationPlot(); 
            createHeatMap();
        } else{
            console.log("GG");
            extent = d3.event.selection;
            // console.log(extent);
            reRenderTheMainGraphs(extent,x,y);
        }
    }
}
