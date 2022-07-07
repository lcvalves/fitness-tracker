// Append the calories_macros_svg object to the body of the div
const calories_macros_svg = d3
  .select("#calories-macros-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("./data/calories-macros.csv").then(function (data) {
  // List of macros = headers of the CSV file
  const macros = data.columns.slice(1);

  // List of dates = value of the first column called date -> X axis
  const dates = data.map((d) => d.date);

  // Add X axis
  const x = d3.scaleBand().domain(dates).range([0, width]).padding([0.2]);
  calories_macros_svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 2000]).range([height, 0]);
  calories_macros_svg.append("g").call(d3.axisLeft(y));

  // color palette = one color per macro
  const color = d3
    .scaleOrdinal()
    .domain(macros)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  //stack the data? --> stack per macro
  const stackedData = d3.stack().keys(macros)(data);

  // Show the bars
  calories_macros_svg
    .append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = date per date
    .data(stackedData)
    .join("g")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    // enter a second time = loop macro per macro to add all bars
    .data((d) => d)
    .join("rect")
    .attr("x", (d) => x(d.data.date))
    .attr("y", (d) => y(d[1]))
    .attr("height", (d) => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());
});
