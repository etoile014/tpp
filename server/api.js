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

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Server for lisning socket.
var server = app.listen(80, function(){
    console.log("Node.js is running to listen port: " + server.address().port + "(in container)");
});

//api get method for testing server
app.get("/api/csv", function(req, res, next){
    var data;
    res.writeHead(200, {'Content-Type': 'text/html'});
    courseDB.get('select * from course2016 where id = GC41203',function (err, row){
	console.log("searching.... " + req.body.id);
	if (err) {console.log(err)}
	else {data = row.name}
    });
    res.write(data);
    res.end();
    console.log("app.get launched");
});

//search api post method
app.post("/api/search", function(req, res, next){
    var year;
    var id;
    //var name, way, credit, grade, semester, type, place, teacher, summery;
    var data;
    switch(req.body.year) {
    case "2013":
	courseDB.get('select * from course2013 where id = ?',[req.body.id],function (err, row){
	    console.log("searching.... " + req.body.id);
	    if (err) {console.log(err)}
	    else {data = row}
	});
	break;
    case "2014":
	courseDB.get('select * from course2014 where id = ?',[req.body.id],function (err, row){
	    console.log("searching.... " + req.body.id);
	    if (err) {console.log(err)}
	    else {data = row}
	});
	break;
    case "2015":
	courseDB.get('select * from course2015 where id = ?',[req.body.id],function (err, row){
	    console.log("searching.... " + req.body.id);
	    if (err) {console.log(err)}
	    else {data = row}
	});
	break;
    case "2016":
	courseDB.get('select * from course2016 where id = ?',[req.body.id],function (err, row){
	    console.log("searching.... " + req.body.id);
	    if (err) {console.log(err)}
	    else {data = row}
	});
	break;
    }
    sleep.sleep(500, function(){
	data.score = req.body.score;
	data.state = req.body.state;
	var resDataJSON = JSON.stringify(data, null, ' ');
	res.send(resDataJSON);
	res.end();
	concole.log("-JSON submitted to host!");
    });
});


//api post method
app.post("/api/csv", function(req, res, next){
    //init post function local handler
    var total = [0,0,0,0,0,0,0,0,0,0,0];//a+,a,b,c,d,x,p,f
    var semesterTotal = [0,0,0,0,0,0,0];
    var semesterGPA = [0,0,0,0,0,0,0];
    var subject = [0,0,0,0,0,0,0,0,0,0,0,0];
    var graduation = 1;      //if there is any problem, this will turns 0.

    var subjectTemp;
    var gradeTemp;

    console.log("I GOT JSON!!");

    res.contentType('application/json');
    db.serialize(function () {
	co(function *() {
	    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
		subjectTemp = eval("req.body.line" + i + ".subject");
		gradeTemp = eval("req.body.line" + i + ".grade");
		switch(eval("req.body.line" + i + ".year")) {
		case "2013":
		    check2013(i, subjectTemp, gradeTemp, total);
		    break;
		case "2014":
		    check2014(i, subjectTemp, gradeTemp, total);
		    break;
		case "2015":
		    check2015(i, subjectTemp, gradeTemp, total);
		    break;
		case "2016":
		    check2016(i, subjectTemp, gradeTemp, total);
		    break;
		}
	    }
	    });
    });

    //Analyze
/*
    db.each("SELECT min, max from common_compulsory, department where subject = '総合1' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, row) {
	var x = 0, y = 0;
	if(row.min == row.max) {
	    x = row.min;
	    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
		var str = eval("req.body.line" + i + ".subject");
		if( str.match(/^1119.+?/) || str.match(/^1319.+?/) || str.match(/^12.+?/)){//miss
		    y++;
		}
	    }
	    if(x > y) {graduation = 1}else{sogo1 = y}
	}
    });
*/
    
    ////////////第一外国語////////////////////
     db.each("SELECT min, max from common_compulsory where subject = '第1外国語(英語)' and depart = 621 and enter=2014", function(err, row){
     	var xmin=row.min;
     	var xmax=row.max;
		var classcode1=[/^31A.*2$/,/^31B.*2$/,/^31C.*2$/,/^31E.*2$/,/^31F.*2$/,/^31G.*2$/];
		var y = countCredit(classcode1);
		var classcode2=[/^313.*2$/,/^4.*2$/,/^315.*2$/,/^316.*2$/,/^317.*2$/,/^313.*2$/];
		var z = countCredit(classcode2);
		
		if(y < 4.5){
			graduation = 0;
		}
		if(y+z < x){
			graduation = 0;
			subject[7] += y+z;
		}
		else{
			subject[7]=xmax;
		}
	});
  
   ////////////総合1////////////
    db.each("SELECT min, max from common_compulsory where subject = '総合科目1' and depart = 621 and enter = 2014", function(err, row){
    	var xmin=row.min,xmax=row.max;
    	var classcode1=[/^11/];
    	var classcode2=[/^13/,/^12/];
    	var y = countCredit(classcode1);
    	if(y == 0){
    	    graduation=0;
    	}
    	if(xmin > y){
    		subject[7]+=y;
    	}
    	else{
    		subject[7]+=min(xmax,y);
    	}
    });
	 
	 ////////////総合2///////////////
	 db.each("SELECT min, max from common_compulsory where subject = '総合科目2' and depart = 621 and enter = 2014", function(err, row){
   	     var x=0, y=0, z=0, A=0, B=0, C=0;
   	     var Amin, Amax, Bmin, Bmax, Cmin, Cmax, xmin, xmax;
   	     
	     console.log("総合科目2:"+x);
	     
    	db.each("SELECT min, max from common_compulsory where subject = '総合科目2-A' and depart = 621 and enter = 2014", function(err, rowA){
       		Amin = rowA.min;
       		Amax = rowA.max;
       		console.log("総合科目2-A 上限:"+Amax+"下限"+Amin);
    	});
    	db.each("SELECT min, max from common_compulsory where subject = '総合科目2-B' and depart = 621 and enter = 2014", function(err, rowB){
        	Bmin = rowB.min;
			Bmax = rowB.max;
			console.log("総合科目2-B 上限:"+Bmax+"下限"+Bmin);
      	});
    	db.each("SELECT min, max from common_compulsory where subject = '総合科目2-C' and depart = 621 and enter = 2014", function(err, rowC){
       		 Cmin = rowC.min;
			 Cmax = rowC.max;
			 console.log("総合科目2-C 上限:"+Cmax+"下限"+Cmin);
      	});
    	     //履修データから科目番号1A*****の単位数をAに、1B*****の単位数をBに、1C*****の単位数をCにそれぞれ格納
   	    var classcode1=[/^1A/];
    	var classcode2=[/^1B/];
    	var classcode3=[/^1C/];
    	A=countCredit(classcode1);
    	B=countCredit(classcode2);
    	C=countCredit(classcode3);
    	if(A<Amin){
    		 graduation=0;
    	}else{
    		 y=min(A,Amax);
   	    }
    	if(B<Bmin){
    		 graduation=0;
    	}else{
    		 y+=min(B,Bmax);
    	}
    	if(C<Cmin){
    		 graduation=0;
    	}else{
    		 y+=min(C,Cmax);
    	}
    	if(y<xmin){
    		 graduation=0;
    		 subject[7]+=y;
    	}else{
    		 subject[7]+=min(y,xmax);
    	}
	 });

	db.each("SELECT min, max from common_compulsory where subject = '総合科目3' and depart = 621 and enter = 2014", function(err, row){
		var xmin=row.min,xmax=row.max, y=0;
		console.log("総合科目3:"+x);
 		//履修データから科目番号1D*****,1E*****,1F*****,1G*****の単位数をyにプラス
 		var classcode = [/^1D/,/^1E/,/^1F/,/^1G/];
		if(xmin > y){
			graduation=0;
			subject[7]+=y;
		}else{
			subject[7]+=min(y,xmax);
		}
	});
	
	///////////体育//////////////////
	db.each("SELECT min, max from common_compulsory where subject = '体育' and depart = 621 and enter = 2014", function(err, row){
		var w, xmin=row.min,xmax=row.max, y, z=0;
		console.log("体育:"+x);

	//履修データから科目番号21*****,25*****の単位数をyに格納
	var cla
	//履修データから科目番号22*****の単位数をzに格納
	//履修データから科目番号23*****,24*****,26*****,27*****の単位数をwに格納
	if(x > 0){
		if(y < 1){
			graduate=0;
     	}
		if(z<1){
			graduate=0;
		}
		if(w<(x-2)){
			graduate=0;
     	}
  //}
	//履修データから科目番号28*****の単位数をsubject[4]に格納
 });
	 console.log("-analyzed");
	 
	 sleep.sleep(2000, function(){
	     var resData =
		 {"REQUIREMENT": {
		     "needGRCourse": 124.5,
		     "getGRCourse": (total[0] + total[1] + total[2] + total[3]),
		     "nowGRCourse": (total[5]),
		     "preGRCourse": 0
		 },
		  "CREDIT": [{
		      "course": "Senmon",
		      "needCourse": 12,
		      "getCourse": 3,
		      "nowCourse": 2,
		      "preCourse": 1,
		      "courseA": 5,
		      "courseSum": 15
		  },{
		      "course": "SenmonKiso",
		      "needCourse": 12,
		      "getCourse": 3,
		      "nowCourse": 2,
		 "preCourse": 1,
		 "courseA": 5,
		 "courseSum": 15
	     },{
		 "course": "Kiso",
		 "needCourse": 12,
		 "getCourse": 3,
		 "nowCourse": 2,
		 "preCourse": 1,
		 "courseA": 5,
		 "courseSum": 15
	     }],
	     "GRADE_GPA":{
		 "countAplus": total[0],
		 "countA": total[1],
		 "countB": total[2],
		 "countC": total[3],
		 "countD": total[4],
		 "countX": total[5],
		 "countP": total[6],
		 "countF": total[7],
		 "countOther": (total[5] + total[6] + total[7]),
		 "completed": (total[0] + total[1] + total[2] + total[3] + total[6]),
		 "start": "2014",
		 "creditTransition": [2,3,4,5,6,7],
		 "gpaTransition": [3,2,3,4,3,3]
	     }
	    };
	var resDataJSON = JSON.stringify(resData ,null, ' ');
	res.send(resDataJSON);
	res.end();
	console.log("-JSON submitted to host!");
    });
    //});
});

/*
Function List
*/

function check2013(i, subject, grade, total) {
    courseDB.get('select credit,id from course2013 where id = ?',[subject],function (err, row){
	if (err) {console.log(err)}
	else {
	    console.log(row);
	    console.log("2013  " + i + ":" + grade);
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
	    console.log("2014  " + i + ":" + grade);
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
	    console.log("2015  " + i + ":" + grade);
	    if(grade == "A+"){total[0] += row.credit}
	    if(grade == "A"){total[1] += row.credit}
	    if(grade == "B"){total[2] += row.credit}
	    if(grade == "C"){total[3] += row.credit}
	    if(grade == "D"){total[4] += row.credit}
	    if(grade == "X"){total[5] += row.credit}
	    if(grade == "P"){total[6] += row.credit}
	    if(grade == "F"){total[7] +s= row.credit}
	}
    });
}
function check2016(i, subject, grade, total) {
    courseDB.get('select credit,id from course2016 where id = ?',[subject],function (err, row){
	if (err) {console.log(err)}
	else {
	    console.log(row);
	    console.log("2016  " + i + ":" + grade);
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

function countCredit(classCode){
	var cnt=0;
	for (var i=0; eval("req.body.line" + i) != undefined ; i++){
		var str = eval("req.body.line" + i + ".subject");
		for(var j=0;j<classCode.length;j++){
			if(str.match(classCode[j])){
				courseDB.get('select credit,id from course2014 where id = ?',[str],function (err, row){
					cnt = cnt + row.credit;
				}
			}
		}
	}
	return cnt;
}

function min(a,b){
	if(a<b){return a;}
	else {return b;}
}
