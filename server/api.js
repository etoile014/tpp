//frontend
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var jschardet = require('jschardet');

//backend
var co = require('co');
var sleep = require('sleep-async')();

//connect to sqliteDB
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(process.cwd() + '/database/requirements.db');
var courseDB = new sqlite3.Database(process.cwd() + '/database/kdb.db');

app.set('views', process.cwd()+ '/views');
var ejsEngine = require('ejs');
app.engine('ejs', ejsEngine.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//test sqlite serverconnection
console.log(db.run('select *  from department'));
/*
courseDB.get("select * from course", function(err, row) {
    console.log(row.name);
}
);
*/

//Server for lisning socket.
var server = app.listen(80, function(){
    console.log("Node.js is running to listen port: " + server.address().port + "(in container)");
});

//api get method
app.get("/api/csv", function(req, res, next){
    var temp;
    var temp2;
    var charCode;
    res.writeHead(200, {'Content-Type': 'text/html'});
    courseDB.get('select name as name,teacher from course limit 10', function(err, row) {
	temp = row.teacher;
	temp2 = row.name;
	charCode = jschardet.detect(temp);
	console.log(temp2 + ": " + temp);
    });
    res.write(temp2 + ":" + temp + "//" + charCode);
    res.end();
    console.log("app.get launch");
    });

//api post method
app.post("/api/csv", function(req, res, next){
    //init post function local handler
    var total = [0,0,0,0,0,0,0,0,0,0,0];//a+,a,b,c,d,x,p,f
    var semesterTotal = [0,0,0,0,0,0,0];
    var semesterGPA = [0,0,0,0,0,0,0];

    console.log("GOT JSON!!");
    
    res.contentType('application/json');
    db.serialize(function () {
	co(function *() {
	    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
		
		console.log(eval("req.body.line" + i + ".year"));
		switch(eval("req.body.line" + i + ".year")) {
		case "2013":
		    check2013(i, eval("req.body.line" + i + ".subject"), eval("req.body.line" + i + ".grade"), total);
		    break;
		case "2014":
		    check2014(i, eval("req.body.line" + i + ".subject"), eval("req.body.line" + i + ".grade"), total);
		    break;
		case "2015":
		    check2015(i, eval("req.body.line" + i + ".subject"), eval("req.body.line" + i + ".grade"), total);
		    break;
		case "2016":
		    check2016(i, eval("req.body.line" + i + ".subject"), eval("req.body.line" + i + ".grade"), total);
		    break;
		}
		
	    }
	    });
    });
		 
	db.each("SELECT min, max from common_compulsory, department where subject = '総合1' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, row) {
	    var x = 0, y = 0;
	    if(row.min == row.max) {
		x = row.min;
		for (var i=0; eval("req.body.line" + i) != undefined ; i++){
		    var str = eval("req.body.line" + i + ".subject");
		    if( str.match(/1119/) || str.match(/1319/) || str.match(/12/)){
			y++;
		    }
		}
	    }
	}
	       )
	    
	    console.log("-analyzed");
	
    sleep.sleep(3000, function(){
	var resData = [
	    {'GRADE_GPA':{
		'countAplus': total[0],
		'countA': total[1],
		'countB': total[2],
		'countC': total[3],
		'countD': total[4],
		'countX': total[5],
		'countP': total[6],
		'countF': total[7],
		'countOther': (total[5] + total[6] + total[7]),
		'completed': (total[0] + total[1] + total[2] + total[3])
	    }
	    }
	];
	var resDataJSON = JSON.stringify(resData);
	res.send(resDataJSON);
	res.end();
	console.log("-JSON submitted to host!");
    });
    //});
});

function check2013(i, subject, grade, total) {
    courseDB.get('select credit,id from course2013 where id = ?',[subject],function (err, row){
	if (err) {console.log(err)}
	else {
	    console.log(row);
	    console.log("2013  " + i + grade);
	    if(grade == "A+"){total[0] += row.credit}
	    if(grade == "A"){total[1] += row.credit}
	    if(grade == "B"){total[2] += row.credit}
	    if(grade == "C"){total[3] += row.credit}
	    if(grade == "D"){total[4] += row.credit}
	    if(grade == "X"){total[5] += row.credit}
	    if(grade == "P"){total[6] += row.credit}
	    if(grade == "F"){total[7] += row.credit}
	}
    });
}
function check2014(i, subject, grade, total) {
    courseDB.get('select credit,id from course2014 where id = ?',[subject],function (err, row){
	if (err) {console.log(err)}
	else {
	    console.log(row);
	    console.log("2014  " + i + grade);
	    if(grade == "A+"){total[0] += row.credit}
	    if(grade == "A"){total[1] += row.credit}
	    if(grade == "B"){total[2] += row.credit}
	    if(grade == "C"){total[3] += row.credit}
	    if(grade == "D"){total[4] += row.credit}
	    if(grade == "X"){total[5] += row.credit}
	    if(grade == "P"){total[6] += row.credit}
	    if(grade == "F"){total[7] += row.credit}
	}
    });
}
function check2015(i, subject, grade, total) {
    courseDB.get('select credit,id from course2015 where id = ?',[subject],function (err, row){
	if (err) {console.log(err)}
	else {
	    console.log(row);
	    console.log("2015  " + i + grade);
	    if(grade == "A+"){total[0] += row.credit}
	    if(grade == "A"){total[1] += row.credit}
	    if(grade == "B"){total[2] += row.credit}
	    if(grade == "C"){total[3] += row.credit}
	    if(grade == "D"){total[4] += row.credit}
	    if(grade == "X"){total[5] += row.credit}
	    if(grade == "P"){total[6] += row.credit}
	    if(grade == "F"){total[7] += row.credit}
	}
    });
}
function check2016(i, subject, grade, total) {
    courseDB.get('select credit,id from course2016 where id = ?',[subject],function (err, row){
	if (err) {console.log(err)}
	else {
	    console.log(row);
	    console.log("2016  " + i + grade);
	    if(grade == "A+"){total[0] += row.credit}
	    if(grade == "A"){total[1] += row.credit}
	    if(grade == "B"){total[2] += row.credit}
	    if(grade == "C"){total[3] += row.credit}
	    if(grade == "D"){total[4] += row.credit}
	    if(grade == "X"){total[5] += row.credit}
	    if(grade == "P"){total[6] += row.credit}
	    if(grade == "F"){total[7] += row.credit}
	}
    });
}
