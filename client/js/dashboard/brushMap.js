function test(value){
    if (value == "algorithm1"){
        // console.log("lol")
        return 1
    }
    else{
        return 2
    }
}
function createBrushMap() {
    width = 330;
    height = 100;
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

    var x = d3.scaleLinear()
      .domain([2960950, 3005934])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    var y = d3.scaleLinear()
      .domain([0, 2])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    var color = d3.scaleOrdinal()
        .domain([1, 2, "virginica" ])
        .range([ "#440154ff",  "#fde725ff","#21908dff"]);
    var myCircle = svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function (d) { return x(d["Time"]); } )
        .attr("y", function (d) { return y(test(d["algorithm"])); } )
        .attr("width", 3)
        .attr("height", 30)
        .style("fill", function (d) { return color(d["label"]) } )
        .style("opacity", 0.5)
    
    

}
