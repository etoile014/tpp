function drawCreditTransition(id,start,dataset) {

    var margin = {top: 20, right: 50, bottom: 40, left: 50};
    var width = 320 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d,i){ return i; })])
    .range([0, width]);

    var maxY = d3.max(dataset, function(d){ return d; });
    maxY = Math.ceil(maxY/10)*10;
    var yScale = d3.scale.linear()
    .domain([0, maxY])
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(function(d,i){
        if( i%2 == 0 ){
            return (start+i/2)+"/spring";
        }
        return start+(i-1)/2+"/autumn";
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
    .ticks(1+maxY/10);

    var line = d3.svg.line()
    .x(function(d,i) { return xScale(i); })
    .y(function(d) { return yScale(d); });

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
    .attr("transform","rotate(-30)")
    .attr("dy",20);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll("text")
    .attr("font-size", "8px")

    svg.selectAll("line")
    .attr("stroke", "#000000")
    .attr("opacity", "0.2");

    svg.append("path")
    .data([dataset])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "#96d946")
    .attr("stroke-width", "2px")
    .attr("d", line);

    svg.append("g")
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("r",3)
    .attr("cx",function(d,i){return xScale(i);})
    .attr("cy",function(d){return yScale(d);})
    .attr("fill",'#96d946');
}
