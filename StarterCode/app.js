var svgHeight = 600; //window.innerHeight;
var svgWidth = 960;  //window.innerWidth;

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
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv").then(function(scatterData){
    //console.log(scatterData);

    scatterData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        //data.age = +data.age;
        //data.obesity = +data.obesity;
        //console.log(data);
    });

    //Scale functions:
    var xLinearScale = d3.scaleLinear()
        .domain([5, d3.max(scatterData, d => d.poverty)])
        .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
        .domain([5, d3.max(scatterData, d => d.healthcare)])
        .range([height, 0]);
    
    //Create axis functions:    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


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
    .attr("r", "12")
    .attr("fill", "red")
    .attr("opacity", ".4");

    var textChart = chartGroup.selectAll("text")
    .data(scatterData)
    .enter()
    .append("text")
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("x", d => xLinearScale(d.poverty))
    .attr("font-size", "10px")
    .text(d => d.abbr)
    //.attr("alignment-baseline", "central")
    .attr("text-anchor", "middle")
    //.classed(".stateText", true)

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("class", "axisText")
    .text("In Poverty (%)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", -90 - (height / 2))
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");


}).catch(function(error) {
    console.log(error);
}); 








