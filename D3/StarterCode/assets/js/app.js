// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var chosenXAxis = 'poverty'
var chosenYAxis = 'healthcare'

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .classed("svg-container", true)
    .append("svg")

    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox","0 0 " + svgWidth + " " + svgHeight)

    .classed("svg-content-responsive", true);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

function xScale(data) {

  var xLinearScale = d3.scaleLinear()
    .range([0, width])
    .domain([d3.min(data, d => d.poverty) * 0.8,
      d3.max(data, d => d.poverty) * 1.2])

  return xLinearScale
}

function yScale(data) {

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.healthcare) * 0.8,
     d3.max(data, d => d.healthcare) * 1.2])
    .range([height, 0]);

  return yLinearScale
}




d3.csv("assets/data/data.csv")
  .then(function(data) {
    console.log(data)
  // parse data
  data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;
  });


  var xLinearScale = d3.scaleLinear()
    .range([0, width])
    .domain([d3.min(data, d => d.poverty) * 0.8,
      d3.max(data, d => d.poverty) * 1.2])

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.healthcare) * 0.8,
      d3.max(data, d => d.healthcare) * 1.2])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);


  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 5)
    .attr("fill", "blue")
    .attr("opacity", ".5");

  var textGroup = chartGroup.selectAll("#abbr")
	  .data(data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
	     .text(d => d.abbr)
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
	     .attr("text-anchor", "middle")
	     .attr("alignment-baseline", "middle")
	     .attr("fill", "black");


  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("text-anchor", "middle")
    .text("In Poverty (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .attr("text-anchor", "middle")
    .text('Lacks Healthcare (%)');

  })
