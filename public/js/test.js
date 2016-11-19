var BarData1 = [4, 3, 2, 1];
var BarData2 = [2, 2, 2, 2, 2];

$(window).load(function () {
    $("#shift1, #page-main1").css({
        opacity: 1,
        display: "inline"
    });
    $("#shift2, #page-main2").css({
        opacity: 0,
        display: "none"
    });
});

$(function(){
    $("#test_div1").on("inview", function(){
        testGraph("#test_graph1", BarData1);
    });
    $("#test_div2").on("inview", function(){
        testGraph("#test_graph2", BarData2);
    });
});

function shift(num){
    console.log("shift("+num+")");
    var id1 = "#shift"+(num%2+1)+", #page-main"+(num%2+1);
    var id2 = "#shift"+num+", #page-main"+num;
    $(id1).animate({
        opacity: 0,
    }, 700, function(){
        testGraphRemove("#test_graph"+(num%2+1));
        testGraphRemove("#test_graph"+(num));
        $(id1).css({
            display: "none"
        });
        $(id2).css({
            display: "inline"
        }).animate({
            opacity: 1
        }, 700);
    });
}

function testGraphRemove(id) {
    var svg = d3.select(id);
    svg.selectAll("rect")
    .remove();
}

function testGraph(id, dataset) {
    var svgW = 300;
    var svgH = 200;
    var stacked = 0;
    var color = ['#96d946','#e9d848','#85d0f6','#e95956', '#0fb196'];

    var svg = d3.select(id)
    .attr({
        width: svgW,
        height: svgH
    });
    svg.selectAll("rect")
    .remove();

    var scale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(data){return data})])
    .range([0, svgH]);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
        x: 0,
        y: svgH,
        width: svgW,
        height: 0,
        fill: function(d, i){ return color[i]; }
    })
    .style("opacity", 0);

    svg.selectAll("rect")
    .transition()
    .duration(1200)
    .attr({
        y: function(d, i){
            stacked += d;
            return svgH - stacked * (svgH / 10);
        },
        height: function(d, i){
            return d * (svgH / 10);
        }
    })
    .style("opacity", 1);
}
