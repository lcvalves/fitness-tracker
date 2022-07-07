// Chart dimensions
const margin = { top: 30, right: 30, bottom: 30, left: 60 },
  width = 1500 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// Append the svg object to the body of the div
const svg = d3
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
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis
    const y = d3.scaleLinear().domain([65, 80]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    svg
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
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.weight))
      .attr("r", 2.5)
      .attr("fill", "#69b3a2");
  }
);
