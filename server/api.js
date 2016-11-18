var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.set('views', process.cwd()+ '/views');
var ejsEngine = require('ejs');
app.engine('ejs', ejsEngine.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Server for lisning socket.
var server = app.listen(80, function(){
    console.log("Node.js is running to listen port: " + server.address().port + "(in container)");
});

//api get method
app.get("/api/csv", function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("hello guys! I got post methot!!");
    res.end();
    console.log("app.get launch.");
});

//api post method
app.post("/api/csv", function(req, res, next){
    var str = req.body;
    var totalAA = 0;
    var totalA = 0;
    var totalB = 0;
    var totalC = 0;
    var totalD = 0;
    var totalX = 0;

    console.log("GOT JSON!!");
    
    //res.setHeader('Content-Type', 'text/plain');
    res.contentType('application/json');
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.send("Hello! Success Upload!" + str.body.line0.subject );
    //res.render('main.ejs', {title1: 'exposed via res.render', body: 'This is body!!', line3: str.body.line3.subject});
    /*temp credit processing*/
    //totalA = eval("req.data.line" + "1" + ".grade");
    //totalA = req.body.line1.grade;
    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
	if(eval("req.body.line" + i + ".grade") == "A+"){totalAA++}
	if(eval("req.body.line" + i + ".grade") == "A"){totalA++}
	if(eval("req.body.line" + i + ".grade") == "B"){totalB++}
	if(eval("req.body.line" + i + ".grade") == "C"){totalC++}
	if(eval("req.body.line" + i + ".grade") == "D"){totalD++}
	if(eval("req.body.line" + i + ".grade") == "X"){totalX++}
    }
    console.log("-analyzed")
    
    var resData = [
	{'name': 'A+', 'data': totalAA},
	{'name': 'A', 'data': totalA},
	{'name': 'B', 'data': totalB},
	{'name': 'C', 'data': totalC},
	{'name': 'D', 'data': totalD},
	{'name': 'X', 'data': totalX},
	{'name': 'completed', 'data': totalAA + totalA + totalB + totalC}
    ];
    var resDataJSON = JSON.stringify(resData);
    res.send(resDataJSON);
    res.end();
    console.log("-JSON submitted to host!");
});
