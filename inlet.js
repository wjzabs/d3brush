var svg = d3.select(".svg2");

var xscale = d3.scale.linear()
    .domain([0,1])
    .range([0,600])

var yscale = d3.scale.linear()
    .domain([0,1])
    .range([0,600])

var brush = d3.svg.brush()
    .x(xscale)
    .y(yscale)

var slider = svg.append("g")
    .attr("transform", "translate(" + [50,50] + ")");

// brush.extent([0.4,0.6])
brush.extent([[0.2,0.2],[0.6,0.6]]) // 2 dimensional extent

brush(slider);

slider.selectAll("rect background")
    .attr("height",30)


    // Sample data
const data = [
    { x: .10, y: .20 },
    { x: .20, y: .40 },
    { x: .30, y: .10 },
    { x: .40, y: .50 },
    // ... more data points
  ];

  // Create scales
// const xScale2 = d3.scaleLinear().domain([0, 50]).range([0, 400]);
// const yScale2 = d3.scaleLinear().domain([0, 50]).range([200, 0]);


// Create scatterplot
svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("fill", "white")
  .classed("white-circle", true)
  .attr("cx", d => xscale(d.x))
  .attr("cy", d => yscale(d.y))
  .attr("r", 5);

  // Function to handle brush events
function brushed(event) {
    if (!event.selection) return;
    
    console.log({event})

    const [[x0, y0], [x1, y1]] = event.selection;
  
    // Set new brush extent programmatically
    brush.extent([[.4, .4], [.8, .8]])(svg.select(".brush"));
  
    // Optional: Update the scatterplot based on the brush selection
    // ...

}