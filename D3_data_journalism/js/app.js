// @TODO: YOUR CODE HERE!

// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.
// Create a scatter plot that represents each state with circle elements.
// Pull in the data from `data.csv` by using the `d3.csv` function.
// Include state abbreviations in the circles.
// Create and situate your axes and labels to the left and bottom of the chart.


//Setting up a space for Healthcare vs Poverty Chart
var svgWidth = 600;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(Data) {
  console.log(Data);

  Data.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
    d.obesity = +d.obesity;
    d.smokes = +d.smokes;
    d.age = +d.age; 
    d.income = +d.income; 
  });

  var Poverty = Data.map(d => d.poverty);
  console.log(Poverty)
  var Healthcare = Data.map(d => d.healthcare);
  console.log(Healthcare);
  var Obesity = Data.map(d => d.obesity);
  console.log(Obesity);
  var Smokes = Data.map(d => d.smokes);
  console.log(Smokes);
  var Age = Data.map(d => d.age);
  console.log(Age);
  var Income = Data.map(d => d.income);
  console.log(Income)

// Healthcare vs Poverty Chart
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.healthcare)])
    .range([height, 0]);

  var xAxis = d3.axisBottom(xLinearScale).ticks(15);
  var yAxis = d3.axisLeft(yLinearScale);

  
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);
    
  // Scatter Plot
  var circlesGroup = chartGroup.selectAll("circle")
      .data(Data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "12")
      .attr("fill", "#788dc2")
      .attr("opacity", ".75")

  // Datapoints
  var circlesGroup = chartGroup.selectAll()
      .data(Data)
      .enter()
      .append("text")
      .text(d => (d.abbr))
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style('fill', 'white');
      


    // Create axes labels
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .text("In Poverty (%)");

    chartGroup.append("text")
    .attr("y", 0 - ((margin.left / 2) + 2))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("transform", "rotate(-90)")
    .text("Lacks Healthcare (%)");

}).catch(function(error) {
  console.log(error);
});

// Bonus1 : 
/*Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. 
 * Or, for an extreme challenge, create three for each axis.
 * Hint: Try binding all of the CSV data to your circles. 
 * This will let you easily determine their x or y values when you click the labels.*/

//Bonus2 :
/* Add tooltips to your circles and display each tooltip with the data that the user has selected. 
 * Use the d3-tip.js plugin developed by Justin Palmer */