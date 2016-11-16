//第3ブロックのアーチグラフ

//入力データ（CSVから数える）
var CountAplus = 50.0,
    CountA = 90.5,
    CountB = 100.5,
    CountC = 50.5,
    CountD = 300.5,
    CountOther = 2.5;

var CountSub=594.5;//本来ならデータベースから取得
var rateAplus=((CountAplus/CountSub)*100).toFixed(1),
    rateA=((CountA/CountSub)*100).toFixed(1),
    rateB=((CountB/CountSub)*100).toFixed(1),
    rateC=((CountC/CountSub)*100).toFixed(1),
    rateD=((CountD/CountSub)*100).toFixed(1),
    rateOhter=((CountOther/CountSub)*100).toFixed(1),
    rateSUM = (((CountAplus+CountA)/CountSub)*100).toFixed(1);


// 半ドーナツグラフの表示データ
var data = [CountAplus,CountA,CountB,CountC,CountD,CountOther];

drawGetCredit("#GradeRate", data); 


function drawGetCredit(id, dataset) {
    // コンテナ
	

    //表示サイズを設定	
    var width = 500,//変更
        height = 400;//変更     
    
    var  radius = Math.min(width, height)/2;
  
    var p=Math.PI;
    var svg = d3.select(id)
            .attr({
                width : width,
                height : height
            })
            .append("g")
            .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ")");

    // パイを定義
    var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d });

    // 円弧の外径と内径を定義
    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(80);

    // データバインド
    var g = svg.selectAll("path")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class", "arc");

    // 円弧の設定
    g.append("path").attr("d", arc); 
  
    // テキスト
    g.append("text")
        .text(rateSUM+"％")
    	.attr("dy","0")
    	.attr("dx","-60")
    	.attr("fill","#464646")
    	.attr("font-size","40px")
    	.attr("class","rate")
	g.append("text")
        .text("A/A+割合")
    	.attr("dy","-40")
    	.attr("dx","-50")
    	.attr("class","upper_rate")
    	.attr("fill","#464646")
    	.attr("font-size","12px")
    	.attr("stroke-width",0.1);
    g.append("text")
        .text("("+CountA+"/"+CountSub+"単位)")
    	.attr("dy","20")
    	.attr("dx","-40")
	.attr("class","under_rate")
    	.attr("fill","#464646")
    	.attr("font-size","10px")
    	.attr("stroke-width",0.1);
    g.append("text")
        .text("0")
    	.attr("dy","20")
    	.attr("dx","-140")
    	.attr("fill","#464646")
    	.attr("font-size","10px")
    	.attr("stroke-width",0.1);
    g.append("text")
        .text("100％")
    	.attr("dy","20")
    	.attr("dx","120")
    	.attr("fill","#464646")
    	.attr("font-size","10px")
    	.attr("stroke-width",0.1);
    	
        
    // スタイル
    var colorArr = ['#e95956','#ee8434','#3aa8ed','#fbd12d',"#61e86d","#e6e6e6"];
    g.attr("stroke", "none")    // 円グラフの区切り線をなしに//変更
        .style({
            fill: function(d, i) {
                return colorArr[i];
            }
        });
    
    //凡例
    var legend = d3.select(id)
            .attr({
                width : width,
                height : height
            })
            .selectAll("rect")
            .data(dataset);
	
	var textArr = ["A+ "+rateAplus+"%","A "+rateA+"%","B "+rateB+"%","C "+rateC+"%","D "+rateD+"%","その他 "+rateOhter+"%"];

	legend.enter()
	.append("text")
	.text(function(d,i){return textArr[i]})
	.attr("x",function(d,i){return 30+i*80})
	.attr("y",261)
	.attr("font-size","10px");
     
     var g2 =legend.append("g");   
	
    legend.enter().append("rect")
	.attr("x",function(d,i){return 10+i*80})
	.attr("y",250)
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
