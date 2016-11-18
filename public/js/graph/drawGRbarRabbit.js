function drawGRrabbit(id,dataset){
    var svgWidth  = 250.0  //svg要素の幅
    var svgHeight = 320.0; //svg要素の高さ
    var xOffset = 10;    //Ｘ座標のずれ具合
    var yOffset = 10;    //Ｙ座標のずれ具合
    var barWidth = 230;
    var barMargin = 0;
    var colorArr = ['#96d946','#e9d848','#85d0f6','#e95956'];

    var RgetGRCourse = parseFloat(((dataset[1]/dataset[0])*100).toFixed(1));//取得済み単位(CSV)
    var RnowGRCourse = parseFloat(((dataset[2]/dataset[0])*100).toFixed(1));//履修中単位(CSV)
    var RpreGRCourse = parseFloat(((dataset[3]/dataset[0])*100).toFixed(1));//履修予定単位(シミュレーション)
    var RrestGRCourse = parseFloat(0.0);
    if(dataset[1]+dataset[2]+dataset[3] <= dataset[0]){
        RrestGRCourse = parseFloat((((dataset[0]-(dataset[1]+dataset[2]+dataset[3]))/dataset[0])*100).toFixed(1));
    }
    var datasetRate = [RgetGRCourse, RnowGRCourse, RpreGRCourse, RrestGRCourse];

    var stacked = 0;
    var svg = d3.select(id)
    .attr({
        width : svgWidth,
        height : svgHeight
    })
    .selectAll("rect")
    .data(datasetRate)
    .enter()
    .append("rect")
    .attr("class","fillPink")
    .attr("height",function(d) {return 0})
    .attr("width",barWidth)
    .attr("x",xOffset)
    .attr("y",function(d,i){
        return svgHeight - yOffset;
    })
    .attr("fill",function(d,i){
        return colorArr[i];
    })
    .style("opacity",0)
    .transition()
    .duration(1200)
    .attr("y",function(d,i){  //Y座標を指定
        stacked += d;
        return svgHeight - yOffset - stacked*2.96; //Y座標を計算
    })
    .attr("height",function(d,i){
        return d*2.96;
    })
    .style("opacity",1);
}
