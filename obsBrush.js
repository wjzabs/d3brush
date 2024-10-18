// function chart () {

    margin = ({top: 10, right: 20, bottom: 20, left: 20})
    height = 120
    width = 360

    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    
    x = d3.scale.linear([0, 10], [margin.left, width - margin.right])

    rx = [...Array.from({length: 10}, Math.random), ...x.domain()]
    // console.log(rx, x.domain())
    // rx = d3.randomUniform(...x.domain())
    // ry = d3.randomNormal(height / 2, height / 12)
    // ry = [...Array.from({length: 20}, Math.random)]
ry = d3.random
        // const svg = d3.create("svg")
    let svg3 = d3.select(".svg3")
        .attr("viewBox", [0, 0, width, height]);
  
    const brush3 = d3.svg.brush()
    .x(xscale)
        // .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
        // .on("start brush end", brushed);
  
        brush3.extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])

        let aa = Array.from({length: 20}, Math.random)
        console.log({aa})

    const circle = svg3.append("g")
        .attr("fill-opacity", 0.2)
      .selectAll("circle")
      .data(aa)
    //   .data(Float64Array.from({length: 800}, rx))
      .join("circle")
        // .attr("transform", d => `translate(${x(d)},${ry()})`)
        .attr("r", 3.5);
  
    svg3.append("g")
        .call(xAxis);
  
    svg3.append("g")
        .call(brush3)
        .call(brush3.move, [3, 5].map(x))
        .call(g => g.select(".overlay")
            .datum({type: "selection"})
            .on("mousedown touchstart", beforebrushstarted));
  
    function beforebrushstarted(event) {
      const dx = x(1) - x(0); // Use a fixed width when recentering.
      const [[cx]] = d3.pointers(event);
      const [x0, x1] = [cx - dx / 2, cx + dx / 2];
      const [X0, X1] = x.range();
      d3.select(this.parentNode)
          .call(brush3.move, x1 > X1 ? [X1 - dx, X1] 
              : x0 < X0 ? [X0, X0 + dx] 
              : [x0, x1]);
    }
  
    function brushed(event) {
      const selection = event.selection;
      if (selection === null) {
        circle.attr("stroke", null);
      } else {
        const [x0, x1] = selection.map(x.invert);
        circle.attr("stroke", d => x0 <= d && d <= x1 ? "red" : null);
      }
    }
  
    // return svg.node();
//   }

chart()();
