// function test(value, finalSettingsLength) {
//     if (finalSettingsLength == 1) {
//         return 1;
//     } else {
//         if (value == "algorithm1") {
//             // console.log("lol")
//             return 1;
//         }
//         else {
//             return 2;
//         }
//     }
// }
// function createBrushMap() {
//     var checkCount = JSON.parse(finalSettings);
//     var finalSettingsLength = Object.keys(checkCount).length;
//     console.log("final length", finalSettingsLength);
//     console.log(finalSettings);
//     var value = 0;
//     if (finalSettingsLength == 1) {
//         value = 100;
//     } else {
//         value = 150;
//     }

//     // set the dimensions and margins of the graph
//     var margin = { top: 10, right: 30, bottom: 30, left: 60 },
//         width = 1400 - margin.left - margin.right,
//         height = value - margin.top - margin.bottom;

//     // width = 330;
//     // height = 100;        

//     $("#brushMapContent").empty();
//     var title = '<h6 class="m-b-20">Time Series Brush Map</h6>';
//     $("#brushMapContent").append(title);
//     var graph = JSON.parse(JSON.stringify(graphs));
//     var data = graph["gazeAndDensity"];
//     var normalisedDataLength = data.length;
//     for (var i = 0; i < normalisedDataLength; i++) {
//         data[i]["Scaled_X"] = width * data[i]["Scaled_X"];
//         data[i]["Scaled_Y"] = height * data[i]["Scaled_Y"];
//     }
//     // data = data.slice(0,10);

//     console.log("Modelled for Brush Map", data);

//     var graphContainer = '<div id="brushMapGraph"></div>';
//     $("#brushMapContent").append(graphContainer);

//     // append the svg object to the body of the page
//     var svg = d3.select("#brushMapGraph")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");

//     // var svg = d3.select("#brushMapGraph")
//     // .append("svg")
//     // .attr("width", width)
//     // .attr("height", height);

//     var x = d3.scaleLinear()
//         .domain([minTime, maxTime])
//         .range([0, width]);
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));

//     // Add Y axis
//     // var y = d3.scaleLinear()
//     //     .domain([d3.min(data, function(d) { return d["signal"] }), d3.max(data, function(d) { return d["signal"] })])
//     //     .range([ height, 0])
//     //     .nice();
//     // svg.append("g")
//     //     .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
//     //     .select(".domain").remove();

//     var y = d3.scaleLinear()
//         .domain([0, finalSettingsLength])
//         .range([height, 0]);
//     svg.append("g")
//         .call(d3.axisLeft(y).ticks(finalSettingsLength));


//     var color = d3.scaleOrdinal()
//         .domain([1, 2, "virginica"])
//         .range(["#37AFA9", "#152329", "#21908dff"]);
//     var myCircle = svg.append('g')
//         .selectAll("circle")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("x", function (d) { return x(d["Time"]); })
//         .attr("y", function (d) { return y(test(d["algorithm"], finalSettingsLength)); })
//         .attr("width", 3)
//         .attr("height", 30)
//         .style("fill", function (d) { return color(d["label"]) })
//         .style("opacity", 0.5);


//     // Add brushing
//     svg
//         .call(d3.brush()                 // Add the brush feature using the d3.brush function
//             .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
//             .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
//             .on("end", brushended)
//         )
//     // function lol() {
//     //     console.log("lol");
//     // }

//     if (finalSettingsLength == 2) {
//         var graphKeys = '<p class="m-b-0"><div class="box mildGreen"></div>Fixations</div><div><div class="box black"></div>Sacades</p>';
//         $("#brushMapContent").append(graphKeys);
//     } else {
//         var graphKeys = '<br>' +
//             '<p class="m-b-0">One can you use this time series plot highligth portion of the Gaze, Fixation and Density Graphs by the means of Linked Brushing !</p>';
//         $("#brushMapContent").append(graphKeys);
//     }

//     // Function that is triggered when brushing is performed
//     function updateChart() {
//         extent = d3.event.selection;
//         // console.log(extent);
//         // console.log(x.invert(extent[0][0]));
//         // lol();
//         myCircle.classed("selected", function (d) { return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length)) })
//     }

//     // A function that return TRUE or FALSE according if a dot is in the selection or not
//     function isBrushed(brush_coords, cx, cy) {
//         var x0 = brush_coords[0][0],
//             x1 = brush_coords[1][0],
//             y0 = brush_coords[0][1],
//             y1 = brush_coords[1][1];
//         return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
//     }

//     function brushended() {
//         if (!d3.event.selection) {
//             extent = d3.event.selection;
//             createGazePlot();
//             createFixationPlot();
//             createHeatMap();
//         } else {
//             console.log("GG");
//             extent = d3.event.selection;
//             // console.log(extent);
//             reRenderTheMainGraphs(extent, x, y);
//         }
//     }


// }

// End of old code
var count_1 = {};
var max_count = 0;
function test(value, finalSettingsLength) {
    if (value in count_1){
        return count_1[value];
    }
    else {
        max_count = max_count + 1;
        count_1[value] = max_count;
        return count_1[value];
    }
    if (finalSettingsLength == 1) {
        return 1;
    } else {
        if (value == "algorithm1") {
            // console.log("lol")
            return 1;
        }
        else {
            return 2;
        }
    }
}

var time_dict = {};

function colorSelection(label,algorithm,myColor,color){
    if(label == 1){
        return color(label);
    } else {
        return myColor(algorithm);
    }
}


function get_min_max_of_each_algorithm(data){
    for(var i = 0; i < data.length ; i++){
        var algorithm = data[i]["algorithm"];
        // if (i == 1){
        //     // console.log("dddll");
        // }
        if( !(algorithm in time_dict)){
            // if (i == 0){
            //     console.log("lll");
            // }
            var Time = {};
            Time["min_time"] = Infinity;
            Time["max_time"] = -Infinity;
            // time_dict[algorithm].push(Time);
            time_dict[algorithm] = Time;
            // time_dict[algorithm]["min_time"] = Infinity;
            // time_dict[algorithm]["max_time"] = -Infinity;
        }
        // if (i==0){
        //     console.log(data[i]["Time"] < time_dict[algorithm]["min_time"]);
        //     console.log(data[i]["Time"],time_dict[algorithm][0]["min_time"]);
        // }
        if(data[i]["Time"] < time_dict[algorithm]["min_time"] ){
            time_dict[algorithm]["min_time"] = data[i]["Time"];
        }
        if(data[i]["Time"] > time_dict[algorithm]["max_time"]){
            time_dict[algorithm]["max_time"] = data[i]["Time"];
        }
    }
}

function createBrushMap(brushedData=null) {
    var checkCount = JSON.parse(finalSettings);
    var finalSettingsLength = Object.keys(checkCount).length;
    // console.log("final length", finalSettingsLength);
    // console.log(finalSettings);
    var value = 0;
    if (finalSettingsLength == 1) {
        value = 100;
    } else {
        value = 600;
    }

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 1400 - margin.left - margin.right,
        height = value - margin.top - margin.bottom;

    // width = 330;
    // height = 100;        

    $("#brushMapContent").empty();
    var title = '<h6 class="m-b-20">Time Series Brush Map</h6>';
    $("#brushMapContent").append(title);
    // var graph = JSON.parse(JSON.stringify(graphs));
    if (brushedData == null) {
        graphCopy = JSON.parse(JSON.stringify(graphs));
    } else{
        graphCopy = JSON.parse(JSON.stringify(brushedData));
    }
    var data = graphCopy["gazeAndDensity"];
    var reshapeGraph = d3.nest().key(function(d) { return d.algorithm;}).entries(data);
    var reshapeGraphLength = reshapeGraph.length;
    var allGroup = []; 
    for (var i=0; i < reshapeGraphLength; i++ ) {
        allGroup.push(reshapeGraph[i].key);
    }
    var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);
    var normalisedDataLength = data.length;
    // console.log(data);
    var minTime = Infinity;
    var maxTime = -Infinity;
    // console.log(normalisedDataLength);
    get_min_max_of_each_algorithm(data);
    var algo_max = "";
    // console.log(time_dict);
    for (var i = 0; i < normalisedDataLength; i++) {
        if(data[i]["Time"] < minTime ){
            minTime = data[i]["Time"];
        }
        if(data[i]["Time"] > maxTime){
            maxTime = data[i]["Time"];
            algo_max = data[i]["algorithm"];
        }
        algorithm = data[i]["algorithm"];
        data[i]["Time"] = data[i]["Time"] - time_dict[algorithm]["min_time"];

        // data[i]["Scaled_X"] = width * data[i]["Scaled_X"];
        // data[i]["Scaled_Y"] = height * data[i]["Scaled_Y"];
    }
    // data = data.slice(0,10);
    minTime = 0;
    maxTime = time_dict[algo_max]["max_time"] - time_dict[algo_max]["min_time"];
    // let minTime =  data[0]["Time"];
    // let maxTime =  data[normalisedDataLength-1]["Time"];

    // console.log("The times lol", minTime, maxTime);
    // console.log("secon",data[0]["Time"],data[normalisedDataLength-1]["Time"]);
    // console.log("Modelled for Brush Map", data);

    var graphContainer = '<div id="brushMapGraph"></div>';
    $("#brushMapContent").append(graphContainer);

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
      .domain([minTime, maxTime])
      .range([ 0, width ]);
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

    var xScale_sec_2 = d3.scaleLinear()
        .domain([minTime, maxTime])
        .rangeRound([0, width]);

    var xScale_sec_ = d3.scaleLinear()
        .domain([0, width])
        .rangeRound([minTime, maxTime]);

    // Add Y axis
    // var y = d3.scaleLinear()
    //     .domain([d3.min(data, function(d) { return d["signal"] }), d3.max(data, function(d) { return d["signal"] })])
    //     .range([ height, 0])
    //     .nice();
    // svg.append("g")
    //     .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
    //     .select(".domain").remove();
    // finalSettingsLength = 4;
    // finalSettingsLength = time_dict.length;
    finalSettingsLength = Object.keys(time_dict).length;
    var y = d3.scaleLinear()
        .domain([0, finalSettingsLength])
        .range([height, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y).ticks(finalSettingsLength));


    var color = d3.scaleOrdinal()
    .domain([1, 2, "virginica"])
    .range([ "#152329", "#37AFA9", "#21908dff"]);
var myCircle = svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d["Time"]); })
    .attr("y", function (d) { return y(test(d["algorithm"], finalSettingsLength)); })
    .attr("width", 3)
    .attr("height", 30)
    .style("fill", function (d) { return colorSelection(d["label"],d["algorithm"],myColor,color) })
    .style("opacity", 0.5);
    // console.log("count_1",count_1);
    // console.log(max_count);
    svg.append('g')
        .attr("id", "chart")
        .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');      
            
    // svg.append("g")
    //     .call(d3.axisLeft(y).ticks(finalSettingsLength));

    var gBrushes = svg.append('g')
        .attr("height", height)
        .attr("width", width)
        .attr("fill", "none")
        // .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("class", "brushes");

    // Object to store brush selections and scatter data
    var mySelections = {};

    // Keep a default 3 of max brushes allowed
    var brushCount = 40;

    // Keep the actual d3-brush functions and their IDs in a list:
    var brushes = [];

    // Add grid
    svg.append("g")
        // .attr("class", "axis axis--grid")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale_sec_2)
            .ticks(100)
            .tickSize(-height)
            .tickFormat(function () { return null; }))
        .selectAll(".tick")
        .classed("tick--minor");

    multiplier = 0;
    // Add Axes
    svg.append('g')
        // .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale_sec_2)
            .ticks(500)
            .tickPadding(10)
            .tickFormat(function (d) {
                // min = d.getMinutes();
                // sec = multiplier + d.getSeconds();
                // if (sec == 0 && min != 0) { sec = 60;  multiplier += 60;}
                // console.log(min, sec);
                if ( ((d > minTime)&&(d%5000==0)) || (d <= minTime) ) return d;
                return null;
            }))
        .attr("text-anchor", null)
        .selectAll("text")
        .attr("x", -3);

    // svg.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x));

    svg.append('g')
        // .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(finalSettingsLength));






    // // Add brushing
    // svg
    //     .call(d3.brush()                 // Add the brush feature using the d3.brush function
    //         .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    //         .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    //         .on("end", brushended)
    //     )


    if (finalSettingsLength == 2 || finalSettingsLength == 1 || finalSettingsLength == 3 || finalSettingsLength == 4) {
        var graphKeys = '<p class="m-b-0">Black parts of the graph are saccades, The colored parts are fixations of the respective algorithm/participants</p>';
        $("#brushMapContent").append(graphKeys);
    } else {
        var graphKeys = '<br>' +
            '<p class="m-b-0">One can you use this time series plot highligth portion of the Gaze, Fixation and Density Graphs by the means of Linked Brushing !</p>';
        $("#brushMapContent").append(graphKeys);
    }

    // Function that is triggered when brushing is performed
    function updateChart() {
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

    // function brushended() {
    //     if (!d3.event.selection) {
    //         extent = d3.event.selection;
    //         createGazePlot();
    //         createFixationPlot();
    //         createHeatMap();
    //     } else {
    //         console.log("GG");
    //         extent = d3.event.selection;
    //         // console.log(extent);
    //         reRenderTheMainGraphs(extent, x, y);
    //     }
    // }

    newBrush();
    drawBrushes();

    var updateBrushes = function () {
        if (brushes.length > brushCount) {
            let i = brushes.length - 1;

            while (i >= brushCount) {
                let tempID = "brush-" + brushes[i].id;

                // Delete selections
                delete mySelections[tempID];

                d3.select('#' + tempID).remove();
                brushes.pop();
                i--;
            }

            drawBrushes();
        }

        if (brushes.length === 0 && brushCount > 0) {
            newBrush();
            drawBrushes();
        }
    }
    /************ End of update brush counts *************/

    //return an array that contains the closest brush edge to the left and right
    function getBrushesAround(brush, brushes) {

        var edge = [minTime, xScale_sec_(width)];

        // console.log("\n");

        brushes.forEach(function (otherBrush) {

            // console.log(otherBrush[0], otherBrush[1]);

            if (brush[0] != otherBrush[0] && brush[1] != otherBrush[1]) {


                if (brush[0] != null && otherBrush[1] <= brush[0]) {

                    if (edge[0] != null && otherBrush[1] > edge[0] || edge[0] == null) {

                        // console.log("1");
                        edge[0] = otherBrush[1];
                    }

                } else if (brush[0] != null && otherBrush[0] > brush[0]) {

                    if (edge[1] != null && otherBrush[0] < edge[1] || edge[1] == null) {

                        // console.log("2");
                        edge[1] = otherBrush[0];
                    }

                }

            }

        });

        return edge;
    }

    /******* Brush features *******/
    function newBrush() {
        console.log("new brush");
        var brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("start", brushstart)
            .on("brush", brushed)
            .on("end", brushend)

        brushes.push({ id: brushes.length, brush: brush });

        function brushstart() {
            // Brush start here
            updateChart();
        };

        function brushed() {

            let selection = d3.event.selection.map(i => xScale_sec_2.invert(i));
            mySelections[this.id] = { start: selection[0], end: selection[1] };

            id_brush = this.id.split("-")[1];
            brush_selected = d3.brushSelection(document.getElementById(this.id));

            if (brush_selected != null) {
                brush_selected = [xScale_sec_(brush_selected[0]), xScale_sec_(brush_selected[1])];
            }

            //find out what surrounds this brush
            var all_Brushes = [];
            brushes.forEach(function (d, a) {
                br_arr = d3.brushSelection(document.getElementById("brush-" + d.id));
                if (br_arr != null) {
                    br_arr = ([xScale_sec_(br_arr[0]), xScale_sec_(br_arr[1])]);
                    all_Brushes.push(br_arr);
                }
            });

            //Make sure no collision

            //find out what surrounds this brush
            var edge = getBrushesAround(brush_selected, all_Brushes);
            // console.log("The Brushed Region");
            // console.log(brush_selected);

            //if the current block gets brushed beyond the surrounding block, limit it so it does not go past
            if (edge[1] != null && brush_selected[1] >= edge[1]) {
                brush_selected[1] = edge[1];
            } else if (edge[0] != null && brush_selected[0] <= edge[0]) {
                brush_selected[0] = edge[0];
            }

            // ******** Capture the edge, but doesn't update the collision ********** //
            d3.select(this).call(brushes[id_brush].brush.extent([[xScale_sec_2(edge[0]), 0], [xScale_sec_2(edge[1]), height]]));
        }

        function brushend() {

            if (!d3.event.selection) {
                console.log("Clear Selections");
                createBrushMap();
                createGazePlot();
                createFixationPlot();
                createHeatMap();
            } else {
            // Figure out if our latest brush has a selection
            var lastBrushID = brushes[brushes.length - 1].id;
            var lastBrush = document.getElementById('brush-' + lastBrushID);
            var selection = d3.brushSelection(lastBrush);

            // ---- Snap ----
            if (!d3.event.sourceEvent) return; // Only transition after input.
            if (!d3.event.selection) return; // Ignore empty selections.
            var d0 = d3.event.selection.map(i => xScale_sec_2.invert(i)),
                d1 = d0.map(d3.timeSecond.round);
            // If empty when rounded, use floor & ceil instead.
            if (d1[0] >= d1[1]) {
                d1[0] = d3.timeSecond.floor(d0[0]);
                d1[1] = d3.timeSecond.offset(d1[0]);

            }
            // d3.select(this).transition().call(d3.event.target.move, d1.map(xScale_sec));
            // ---- ----

            // If it does, that means we need another one
            if (brushes.length < brushCount && selection && selection[0] !== selection[1]) {
                newBrush();
            }

            // console.log("Brushend")
            // console.log("All brushes so far");
            // console.log(brushes);
            // if (brushes.length == 2){
            //     console.log(brushes.map(i => xScale_sec_2.invert(i)));
            // }
            // console.log(mySelections);
            var d0 = d3.event.selection.map(i => xScale_sec_2.invert(i));
            // console.log(d0);

            // Always draw brushes
            drawBrushes();
            newMultiBrushRerender(mySelections);
            }
        }

    }

    function drawBrushes() {

        var brushSelection = gBrushes
            .selectAll('.brush')
            .data(brushes, function (d) { return d.id });

        // Set up new brushes
        brushSelection.enter()
            .insert("g", '.brush')
            .attr('class', 'brush')
            .attr('id', function (brush) { return "brush-" + brush.id; })
            .each(function (brushObject) {
                // call the brush
                brushObject.brush(d3.select(this));
            });

        brushSelection
            .each(function (brushObject) {
                d3.select(this)
                    .attr('class', 'brush')
                    .selectAll('.overlay')
                    .style('pointer-events', function () {
                        var brush = brushObject.brush;
                        if (brushObject.id === brushes.length - 1 && brush !== undefined) {
                            return 'all';
                        } else {
                            return 'none';
                        }
                    });
            })

    }


}
