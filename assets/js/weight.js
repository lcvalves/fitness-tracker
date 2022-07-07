// Append the weight_svg object to the body of the div
const weight_svg = d3
  .select("#weight-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Read the data
d3.csv(
  "./data/weight.csv",
  // Format CSV header variables
  function (d) {
    return { date: d3.timeParse("%Y-%m-%d")(d.date), weight: d.weight };
  }
).then(
  // Use dataset
  function (data) {
    // X axis --> assign to date
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    weight_svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis
    const y = d3.scaleLinear().domain([65, 80]).range([height, 0]);
    weight_svg.append("g").call(d3.axisLeft(y));

    // Add the line
    weight_svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.weight))
      );
    // Add the points
    weight_svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.weight))
      .attr("r", 2.5)
      .attr("fill", "#003660");
  }
);
