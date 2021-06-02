var svgHeight = 900; //window.innerHeight;
var svgWidth = 900;  //window.innerWidth;

var margin = {
    top: 20,
    right: 40,
    bottom: 70,
    left: 100
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv").then(function(scatterData){
    //console.log(scatterData);

    scatterData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.obesity = +data.obesity;
        //console.log(data);
    });

    //Scale functions:
    var xLinearScale = d3.scaleLinear()
        //.domain([0, d3.max(scatterData, d => d.poverty)])
        .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
        //.domain([0, d3.max(scatterData, d => d.healthcare)])
        .range([height, 0]);
    
    //Create axis functions:    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Max and min 
    var xAxisMin = d3.min(scatterData, d => d.healthcare);
    var xAxisMax = d3.max(scatterData, d => d.healthcare);
    var yAxisMin = d3.min(scatterData, d => d.poverty);
    var yAxisMax = d3.max(scatterData, d => d.poverty);

    //Set domains
    xLinearScale.domain([xAxisMin, xAxisMax]);
    yLinearScale.domain([yAxisMin, yAxisMax]);

    //Apend axes to the chart:
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

    //Create circles;
    var circlesGroup = chartGroup.selectAll("circle")
    .data(scatterData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "red")
    //.classed("stateCircle", true)
    .attr("opacity", ".5");

    chartGroup.append("g")
    .selectAll("text")
    .data(scatterData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("x", d => xLinearScale(d.healthcare))
    .classed(".stateText", true)
    .attr("alignment-baseline", "central")

    chartGroup.append("text")
    .attr("transform", `translate(${-45+(width / 2)}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .attr("y", 0 - margin.left + 40)
    .attr("x", -90 - (height / 2))
    .text("In Poverty (%)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "axisText")
    .attr("alignment-baseline", "central")
    .text("Lacks Healthcare (%)");


}).catch(function(error) {
    console.log(error);
}); 








