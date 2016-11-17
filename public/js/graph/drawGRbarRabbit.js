var needGRCourse = 124.5;//卒業必要単位(データベース)
var getGRCourse = 98.0;//取得済み単位(CSV)
var nowGRCourse = 20.5;//履修中単位(CSV)
var preGRCourse = 2.5;//履修予定単位(シミュレーション)
var restGRCourse = needGRCourse - (getGRCourse + nowGRCourse + preGRCourse);
var RgetGRCourse = ((getGRCourse/needGRCourse)*100).toFixed(1);//取得済み単位(CSV)
var RnowGRCourse = ((nowGRCourse/needGRCourse)*100).toFixed(1);//履修中単位(CSV)
var RpreGRCourse = ((preGRCourse/needGRCourse)*100).toFixed(1);//履修予定単位(シミュレーション)
var RrestGRCourse = (100.0- RgetGRCourse-RnowGRCourse-RpreGRCourse);//計算結果が必ず100%になるように(計算値はアバウトになるけど)

//alert(RgetGRCourse+"% "+RnowGRCourse+"% "+RpreGRCourse+"% "+floatFormat(RrestGRCourse,1)+"% ");
rabbit_data = [parseFloat(RgetGRCourse),parseFloat(RnowGRCourse),parseFloat(RpreGRCourse),floatFormat(RrestGRCourse,1)];

function floatFormat(number,n){
    var pow = Math.pow(10,n);
    return Math.round(number*pow)/pow;
}

function drawGRrabbit(id,dataset){
    var svgWidth  = 250.0  //svg要素の幅
    var svgHeight = 320.0; //svg要素の高さ
    var xOffset = 10;    //Ｘ座標のずれ具合
    var yOffset = 10;    //Ｙ座標のずれ具合
    var barWidth = 230;
    var barMargin = 0;
    var colorArr = ['#96d946','#e9d848','#85d0f6','#e95956'];


    var svg = d3.select(id)
    .attr({
        width : svgWidth,
        height : svgHeight
    })
    .selectAll("rect")
    .data(dataset);
    var stacked = 0;

    svg.enter()
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
