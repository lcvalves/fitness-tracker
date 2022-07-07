// Append the waist_svg object to the body of the div
const waist_svg = d3
  .select("#waist-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Read the data
d3.csv(
  "./data/waist.csv",
  // Format CSV header variables
  function (d) {
    return { date: d3.timeParse("%Y-%m-%d")(d.date), waist: d.waist };
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
    waist_svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis
    const y = d3.scaleLinear().domain([75, 95]).range([height, 0]);
    waist_svg.append("g").call(d3.axisLeft(y));

    // Add the line
    waist_svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#FF0000")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.waist))
      );
    // Add the points
    waist_svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.waist))
      .attr("r", 2.5)
      .attr("fill", "#A80000");
  }
);
