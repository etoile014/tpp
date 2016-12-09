function drawGPATransition(id,dataset) {

    var margin = {top: 20, right: 50, bottom: 50, left: 50};
    var width = 320 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d,i){ return i; })])
    .range([0, width]);

    var yScale = d3.scale.linear()
    .domain([0, 4.5])
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(function(d,i){
		return dataset[i]["semester"];
    })
    .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)
    .ticks(d3.max(dataset, function(d,i){ return i; }));

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10)

    var line = d3.svg.line()
    .x(function(d,i) { return xScale(i); })
    .y(function(d) { return yScale(d["GPA"]); });

    var svg = d3.select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("font-size", "8px")
    .attr("transform","rotate(-20)")
    .attr("dy",10);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll("text")
    .attr("font-size", "8px")
    .attr("transform","rotate(1)");

    svg.selectAll("line")
    .attr("stroke", "#000000")
    .attr("opacity", "0.2");

    svg.append("path")
    .data([dataset])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "#96d946")
    .attr("stroke-width", "2px")
    .attr("d", line)
    ///////アニメーション部分
    .attr("opacity",0)
    .transition()   // トランジション開始
    .duration(1000)
    .attr("opacity",1)
    ////////////////////////
    ;

    svg.append("g")
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("r",3)
    .attr("cx",function(d,i){return xScale(i);})
    .attr("cy",function(d){return yScale(d["GPA"]);})
    .attr("fill",'#96d946')
    ///////アニメーション部分
    .attr("opacity",0)
    .transition()   // トランジション開始
    .duration(1000)
    .attr("opacity",1)
    ////////////////////////;

    var textArr=["GPA"];
    var colorArr=["#96d946"];

    var svg1 = d3.select(id);
    svg1.selectAll("rect")
       .data(colorArr)
       .enter()
       .append("rect")
       .attr("fill",function(d,i){ return d})
       .attr("x",150)
       .attr("y",185)
       .attr("width",15)
       .attr("height",15);
    svg1.append("g")
    	.selectAll("text")
    	.data(textArr)
    	.enter()
    	.append("text")
    	.attr("x",170)
    	.attr("y",195)
    	.text(function(d){return d;})
    	.attr("font-size","12px")
    	.attr("transform","rotate(1)");
}
