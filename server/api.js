//frontend
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

//connect to sqliteDB
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(process.cwd() + '/database/requirements.db');

app.set('views', process.cwd()+ '/views');
var ejsEngine = require('ejs');
app.engine('ejs', ejsEngine.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

console.log(db.run("select *  from department"));

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
    var totalP = 0;
    var totalF = 0;

    console.log("GOT JSON!!");
    
    res.contentType('application/json');
    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
	if(eval("req.body.line" + i + ".grade") == "A+"){totalAA++}
	if(eval("req.body.line" + i + ".grade") == "A"){totalA++}
	if(eval("req.body.line" + i + ".grade") == "B"){totalB++}
	if(eval("req.body.line" + i + ".grade") == "C"){totalC++}
	if(eval("req.body.line" + i + ".grade") == "D"){totalD++}
	if(eval("req.body.line" + i + ".grade") == "X"){totalX++}
	if(eval("req.body.line" + i + ".grade") == "P"){totalP++}
	if(eval("req.body.line" + i + ".grade") == "F"){totalF++}
    }
/*
    db.each("SELECT min, max from common_compulsory, department where subject = '総合1' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, row) {
	var x = 0, y = 0;
	if(row.min == row.max) {
	    x = row.min;
	)
*/
    console.log("-analyzed")
    
    var resData = [
	{'name': 'A+', 'data': totalAA},
	{'name': 'A', 'data': totalA},
	{'name': 'B', 'data': totalB},
	{'name': 'C', 'data': totalC},
	{'name': 'D', 'data': totalD},
	{'name': 'X', 'data': totalX},
	{'name': 'P', 'data': totalP},
	{'name': 'F', 'data': totalF},
	{'name': 'completed', 'data': totalAA + totalA + totalB + totalC}
    ];
    var resDataJSON = JSON.stringify(resData);
    res.send(resDataJSON);
    res.end();
    console.log("-JSON submitted to host!");
});
