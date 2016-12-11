function drawCreditTransition(id,dataset) {
    var margin = {top: 20, right: 50, bottom: 50, left: 50};
    var width = 320 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

	var dataset1 = [dataset[0]["credit"]];
	for(var i=1;i<dataset.length;i++){
		dataset1.push(dataset1[i-1]+dataset[i]["credit"]);
	}
	///////////////軸設定///////////////////////////
    var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d,i){ return i; })])
    .range([0, width]);

    var maxY = d3.max(dataset1, function(d){ return d; });
    maxY = Math.ceil(maxY/10)*10;
    var yScale = d3.scale.linear()
    .domain([0, maxY])
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
    .tickFormat(function(d){return d;})
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10)
    .ticks(1+maxY/10);
	///////////////////////////////////////////

    var line = d3.svg.line()
    .x(function(d,i) { return xScale(i); })
    .y(function(d) { return yScale(d["credit"]); });

	var line1 = d3.svg.line()
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
    .attr("cy",function(d){return yScale(d["credit"]);})
    .attr("fill",'#96d946')
    ///////アニメーション部分
    .attr("opacity",0)
    .transition()   // トランジション開始
    .duration(1000)
    .attr("opacity",1)
    ////////////////////////
    ;

	svg.append("path")
    .data([dataset1])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "#e95956")
    .attr("stroke-width", "2px")
    .attr("d", line1)
    ///////アニメーション部分
    .attr("opacity",0)
    .transition()   // トランジション開始
    .duration(1000)
    .attr("opacity",1)
    ////////////////////////
    ;

    svg.append("g")
    .selectAll("circle")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("r",3)
    .attr("cx",function(d,i){return xScale(i);})
    .attr("cy",function(d){return yScale(d);})
    .attr("fill",'#e95956')
    ///////アニメーション部分
    .attr("opacity",0)
    .transition()   // トランジション開始
    .duration(1000)
    .attr("opacity",1)
    ////////////////////////
    ;


    //////////////////////////凡例/////////////////////////////////
    var textArr=["修得単位数","累計"];
    var colorArr=["#96d946","#e95956"];

    var svg1 = d3.select(id);
    svg1.selectAll("rect")
       .data(colorArr)
       .enter()
       .append("rect")
       .attr("fill",function(d,i){ return d})
       .attr("x",function(d,i){
       	   if(i==0){return 80;}
       	   else {return 180;}
        })
       .attr("y",185)
       .attr("width",15)
       .attr("height",15);
    svg1.append("g")
    	.selectAll("text")
    	.data(textArr)
    	.enter()
    	.append("text")
    	.attr("x",function(d,i){
    		if(i==0){return 100;}
    		else {return 200;}
    	})
    	.attr("y",195)
    	.text(function(d){return d;})
    	.attr("font-size","12px")
    	.attr("transform","rotate(1)");
   //////////////////////////////////////////////////////////////////////
}
