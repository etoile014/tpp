function drawGradeRate(id, dataset) {
    var CountSub = dataset[0]+dataset[1]+dataset[2]+dataset[3]+dataset[4]+dataset[5];
    var rateAplus = ((dataset[0]/CountSub)*100).toFixed(1);
    var rateA = ((dataset[1]/CountSub)*100).toFixed(1);
    var rateB = ((dataset[2]/CountSub)*100).toFixed(1);
    var rateC = ((dataset[3]/CountSub)*100).toFixed(1);
    var rateD = ((dataset[4]/CountSub)*100).toFixed(1);
    var rateOther = ((dataset[5]/CountSub)*100).toFixed(1);
    var rateSUM = (((dataset[0]+dataset[1])/CountSub)*100).toFixed(1);
    var datasetRate = [rateAplus, rateA, rateB, rateC, rateD, rateOther];

    //表示サイズを設定
    var width = 400;//変更
    var height = 350;//変更
    var radius = Math.min(width, height)/2;
    var p = Math.PI;
    // パイを定義
    var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d });
    // 円弧の外径と内径を定義
    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(80);
    var colorArr = ['#e95956','#ee8434','#3aa8ed','#fbd12d',"#61e86d","#e6e6e6"];

    // SVGの中身を生成
    var svg = d3.select(id)
    .attr({
        width : width,
        height : height
    });

    // 円弧
    var path = svg.selectAll("path")
    .data(pie(datasetRate))
    .enter()
    .append("path")
    .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("stroke", "none")    // 円グラフの区切り線をなしに//変更
    .style({
        fill: function(d, i) { return colorArr[i]; }
    });

    // テキスト
    var labelArr = [0, 1, 2, 3, 4];
    var texts = svg.selectAll("text")
    .data(labelArr);

    texts.enter().append("text")
    .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")")
    .text(rateSUM+"％")
    .attr("dy","0")
    .attr("dx","-60")
    .attr("fill","#464646")
    .attr("font-size","40px")
    .attr("class","rate")
    texts.enter().append("text")
    .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")")
    .text("A/A+割合")
    .attr("dy","-40")
    .attr("dx","-25")
    .attr("class","upper_rate")
    .attr("fill","#464646")
    .attr("font-size","12px")
    .attr("stroke-width",0.1);
    texts.enter().append("text")
    .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")")
    .text("("+(dataset[0]+dataset[1])+"/"+CountSub+"単位)")
    .attr("dy","20")
    .attr("dx","-40")
    .attr("class","under_rate")
    .attr("fill","#464646")
    .attr("font-size","10px")
    .attr("stroke-width",0.1);
    texts.enter().append("text")
    .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")")
    .text("0")
    .attr("dy","20")
    .attr("dx","-140")
    .attr("fill","#464646")
    .attr("font-size","10px")
    .attr("stroke-width",0.1);
    texts.enter().append("text")
    .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")")
    .text("100％")
    .attr("dy","20")
    .attr("dx","120")
    .attr("fill","#464646")
    .attr("font-size","10px")
    .attr("stroke-width",0.1);

    //凡例
    var textArr = ["A+ "+dataset[0]+"%","A "+dataset[1]+"%","B "+dataset[2]+"%","C "+dataset[3]+"%","D "+dataset[4]+"%","その他 "+dataset[5]+"%"];
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d,i){return textArr[i]})
    .attr("x",function(d,i){return 30+i*80})
    .attr("y",240)
    .attr("font-size","10px");
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x",function(d,i){return 10+i*80})
    .attr("y",228)
    .attr("width",15)
    .attr("height",15)
    .attr("fill",function(d,i){return colorArr[i]});

    //アニメーション
    svg.selectAll("path")
    .transition()   // トランジション開始
    .duration(1000) // 1秒間でアニメーションさせる
    .attrTween("d", function(d){    // 指定した範囲で値を変化させアニメーションさせる
        var interpolate = d3.interpolate(
            { startAngle : -p/2, endAngle : -p/2 },   // 各円グラフの開始角度
            { startAngle : (d.startAngle-p)/2, endAngle : (d.endAngle-p)/2 }    // 各円グラフの終了角度
        );
        return function(t){
            return arc(interpolate(t)); // 時間に応じて処理
        };
    });
}
