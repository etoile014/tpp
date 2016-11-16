
drawGRbar("#barGraph",data);

function drawGRbar(id,dataset){
	var svgWidth  = 300  
	var svgHeight = 296; 
	var xOffset = 150;   
	var yOffset = 10;    
	//var width = 300,height = 200;
    var barWidth = 20;
	var barMargin = 15;
	var colorArr = ['#96d946','#e9d848','#85d0f6','#e95956'];
	
	
    var svg = d3.select(id)
    			.attr({
                width : svgWidth,
                height : svgHeight
           		})
            	.selectAll("rect")
        		.data(dataset);
        		
    svg.enter()
       .append("rect")
       .attr("class","fillPink")
       .attr("height",0)
       .attr("width",barWidth)
       .attr("x",function(d,i){
       	   		return i * (barWidth + barMargin) + xOffset;
       		})
       .attr("y",svgHeight-yOffset)
       .attr("fill",function(d,i){
       		return colorArr[i];
       	})
       .transition()
       .duration(1200)
       .delay(function(d,i){
			return i * 120;
		})
		.attr("y",function(d,i){ 
			return svgHeight - d*2.96 - yOffset; 
		})
		.attr("height",function(d,i){
			return d*2.96;
		});
	
	svg.enter()
	   .append("text")
	   .attr("class","barRate")
       .attr("fill","#464646")
	   .text(function(d){return d+"%";})
	   .attr("x",function(d,i){
       	   		return i * (barWidth + barMargin) + xOffset-2.96;
       		})
       .attr("y",svgHeight-yOffset-5)
	   .transition()
	   .duration(1200)
       .attr("y",function(d,i){
       	   		return svgHeight - d*2.96 - yOffset -5;
       	   });
    svg.enter()
       .append("rect")
       .attr("height",20)
       .attr("width",20)
       .attr("x",20)
       .attr("y",function(d,i){
        	return i*30+50;
        })
       .attr("fill",function(d,i){
       	   		return colorArr[i];
       	   });
    var textArr = ["取得済み","履修中","履修予定","残り"];
    svg.enter()
       .append("text")
       .attr("class","legend")
       .attr("font-size","12px")
       .attr("fill","#464646")
       .text(function(d,i){
        	return textArr[i];
        })
       .attr("x",45)
       .attr("y",function(d,i){
        	return i*30+64;
        });
}

