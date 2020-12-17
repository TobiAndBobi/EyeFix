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
    width = 430 * controlTopGraphSize;
    height = 285 * controlTopGraphSize;
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

    
    var imageUrl = inputToURL(document.getElementById('uploadeyeGazeImage'));
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

    var colors = ["black", "red", "blue", "yellow"];
    console.log(reshapeGraphLength);
    for (var i=0; i < reshapeGraphLength; i++ ) {
        key = reshapeGraph[i].key;
        values = reshapeGraph[i].values;
        createForEachAlgorithmDensities(svg, x, y, key, values, myColor(key))
    }
    console.log("the Count", reshapeGraphLength)
    if (reshapeGraphLength > 0) {
        let keyMap =  [];
        for (var i=0; i < reshapeGraphLength; i++) {
            // console.log(myColor(reshapeGraphLength[i]));
            singleKey = '<span class="box" style="background-color:' + myColor(reshapeGraph[i].key) + ' ;">' + reshapeGraph[i].key + '</span>';
            keyMap.push(singleKey);
        }
        var graphKeys = '<br><div class="keyMappingBox"><p class="m-b-0">' + keyMap.join('') + '</p></div>';
        // var graphKeys = '<br>' +
        // '<p class="m-b-0"><div><div class="box black"></div>' + reshapeGraph[0].key + '</div></p>' +
        // '<p class="m-b-0"><div><div class="box red"></div>' + reshapeGraph[1].key + '</div></p>';
        $("#heatMapContent").append(graphKeys);
    } else {
        var graphKeys = '<br>' +
        '<p class="m-b-0">The Heat map is useful to find most dense fixation regions</div></p>';
        $("#heatMapContent").append(graphKeys);
    }

    // Add brushing
    // svg
    // .call(d3.brush()                 // Add the brush feature using the d3.brush function
    //     .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    //     // .on("start brush", updateHeatChart) // Each time the brush selection changes, trigger the 'updateHeatChart' function
    //     .on("end", heatBrushended)
    // )

    // function heatBrushended() {
    //     if (!d3.event.selection) {
    //         extent = d3.event.selection;
    //         createBrushMap();
    //         // createGazePlot();
    //         createFixationPlot();
    //         createHeatMap();
    //     } else {
    //         console.log("GG");
    //         extent = d3.event.selection;
    //         console.log("Draw new graph");
    //         // console.log(extent);
    //         reRenderBasedOnHeatMap(extent, x, y);
    //     }
    // }

    var gBrushes = svg.append('g')
  .attr("class", "brushes");

    // We also keep the actual d3-brush functions and their IDs in a list:
    var brushes = [];

    /* CREATE NEW BRUSH
    *
    * This creates a new brush. A brush is both a function (in our array) and a set of predefined DOM elements
    * Brushes also have selections. While the selection are empty (i.e. a suer hasn't yet dragged)
    * the brushes are invisible. We will add an initial brush when this viz starts. (see end of file)
    * Now imagine the user clicked, moved the mouse, and let go. They just gave a selection to the initial brush.
    * We now want to create a new brush.
    * However, imagine the user had simply dragged an existing brush--in that case we would not want to create a new one.
    * We will use the selection of a brush in brushend() to differentiate these cases.
    */
    function newBrush() {
    var brush = d3.brush()
        .on("start", brushstart)
        .on("brush", brushed)
        .on("end", brushend);

    brushes.push({id: brushes.length, brush: brush});

    function brushstart() {
        // your stuff here  
        extent = d3.event.selection;
        console.log(extent);
        // console.log(x.invert(extent[0][0]));
        // lol();
        // myCircle.classed("selected", function (d) { return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length)) })
    };

    function brushed() {
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
            console.log(extent);
            let extendArr = [];
            console.log(brushes);
            for(brush of brushes){
                console.log(brush);
                extendArr.push(d3.brushSelection(document.getElementById("brushheat-" + brush.id)));
                console.log("Thevdiya");
                console.log(extendArr);
            }
            reRenderBasedOnHeatMap(extendArr, x, y);
        }
    }

    function brushend() {
        if (!d3.event.selection) {
            extent = d3.event.selection;
            createBrushMap();
            // createGazePlot();
            createFixationPlot();
            createHeatMap();
        }else{
            // Figure out if our latest brush has a selection
            var lastBrushID = brushes[brushes.length - 1].id;
            var lastBrush = document.getElementById('brushheat-' + lastBrushID);
            var selection = d3.brushSelection(lastBrush);

            // If it does, that means we need another one
            if (selection && selection[0] !== selection[1]) {
            newBrush();
            }

            // Always draw brushes
            drawBrushes();
        }
    }
    }

    function drawBrushes() {

    var brushSelection = gBrushes
        .selectAll('.brush')
        .data(brushes, function (d){return d.id});

        // Set up new brushes
    brushSelection.enter()
        .insert("g", '.brush')
        .attr('class', 'brush')
        .attr('id', function(brush){ return "brushheat-" + brush.id; })
        .each(function(brushObject) {
        //call the brush
        brushObject.brush(d3.select(this));
        });

        /* REMOVE POINTER EVENTS ON BRUSH OVERLAYS
        *
        * This part is abbit tricky and requires knowledge of how brushes are implemented.
        * They register pointer events on a .overlay rectangle within them.
        * For existing brushes, make sure we disable their pointer events on their overlay.
        * This frees the overlay for the most current (as of yet with an empty selection) brush to listen for click and drag events
        * The moving and resizing is done with other parts of the brush, so that will still work.
        */
    brushSelection
        .each(function (brushObject){
        d3.select(this)
            .attr('class', 'brush')
            .selectAll('.overlay')
            .style('pointer-events', function() {
            var brush = brushObject.brush;
            if (brushObject.id === brushes.length-1 && brush !== undefined) {
                return 'all';
            } else {
                return 'none';
            }
            });
        })

    brushSelection.exit()
        .remove();
    }

    newBrush();
    drawBrushes();





}