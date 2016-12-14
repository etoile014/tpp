//frontend
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var jschardet = require('jschardet');

//backend
var fs = require('fs');
var co = require('co');
var async = require('async');
var sleep = require('sleep-async')();
var morgan = require('morgan');
var exec = require('child_process').exec;

//connect to sqliteDB
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(process.cwd() + '/database/requirements.db');
var courseDB = new sqlite3.Database(process.cwd() + '/database/kdb.db');

app.set('views', process.cwd() + '/views');
//var ejsEngine = require('ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//access log
var stream = fs.createWriteStream(process.cwd() + '/server/log.txt', { flags: 'a' });
app.use(morgan({ stream: stream }));

//Server for lisning socket.
var server = app.listen(80, function() {
    console.log("Node.js is running to listen port: " + server.address().port + "(in container)");
});

//api get method for testing server
app.get("/api/csv", function(req, res, next) {
    var data;
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    courseDB.get('select * from course2016 where id = GC41203', function(err, row) {
        console.log("searching.... " + req.body.id);
        if (err) {
            console.log(err)
        } else {
            data = row.name
        }
    });
    res.write(data);
    res.end();
    console.log("app.get launched");
});

//maintainance api
app.post("/api/gr", function(req, res, next) {
    var url;
    var readurl = fs.createReadStream(process.cwd() + '/server/url.txt');
    readurl.on('data', function (data) {
	url = data.toString();
    });
    var temp;
    res.contentType('application/json');
    async.waterfall([
	function(callback) {
	    var read = fs.createReadStream(process.cwd() + '/public/js/tmp/' + req.body.id + '_' + req.body.year + '.json');
	    console.log("///--" + req.body.id + "---" + req.body.year + "--maybe");
	    read.on('data', function (data) {
		temp = data;
		//console.log(data.toString());
		callback(null);
	    });
	},
	function(callback) {
	    /*slack post*/
	    var command = 'curl -X POST --data-urlencode \'payload={\"channel\"\: \"#log\",\"username\"\: \"webhookbot\", \"text\"\: \"maintainance api launched\", \"icon_emoji\"\: \"\:ghost\:\"}\' ' + url;
	    exec(command, function(err, stdout, stderr){
		if(stderr != undefined){
		    console.log(stderr);
		}
		console.log("//post at//" + command + "//" + url);
		callback(null);
	    });
	},
	function(callback) {
	    /*send to host*/
	    res.send(temp);
	    res.end();
	    console.log("maintainance api launched");
	    callback(null);
	}
    ]);
});

//search by name
app.post("/api/name_search", function(req, res, next) {
    var i = 0;
    var data = {sum:0};
    console.log("searching by name.... " + req.body.name);
    async.waterfall([
	function(callback) {
	    switch (req.body.year) {
	    case "2013":
		courseDB.each('select * from course2013 where name like ? limit 100', [req.body.name], function(err, row) {
		    if (err) {
			console.log(err);
		    } else {
			data[i] = row;
			i++;
			data.sum++;
		    }
		},
			      function(){
				  callback(null);
			      });
		break;
	    case "2014":
		courseDB.each('select * from course2014 where name like ?', [req.body.name], function(err, row) {
		    if (err) {
			console.log(err);
		    } else {
			data[i] = row;
			i++;
			data.sum++;
		    }
		},
			      function(){
				  callback(null);
			      });
		break;
	    case "2015":
		courseDB.each('select * from course2015 where name like ?', [req.body.name], function(err, row) {
		    if (err) {
			console.log(err);
		    } else {
			data[i] = row;
			i++;
			data.sum++;
		    }
		},
			      function(){
				  callback(null);
			      });
		break;
	    case "2016":
		courseDB.each('select * from course2016 where name like ?', [req.body.name], function(err, row) {
		    if (err) {
			console.log(err);
		    } else {
			//console.log("///" + row);
			data[i] = row;
			i++;
			data.sum++;
		    }
		},
			      function(){
				  callback(null);
			      });
		break;
	    default:
		courseDB.each('select * from course2016 where name like ?', [req.body.name], function(err, row) {
		    if (err) {
			console.log(err);
		    } else {
			data[i] = row;
			i++;
			data.sum++;
		    }
		},
			      function(){
				  callback(null);
			      });
		break;
	    }
	},
	function() {
	    //data.score = req.body.score;
	    //data.state = req.body.state;
	    var resDataJSON = JSON.stringify(data, null, ' ');
	    res.send(resDataJSON);
	    res.end();
	    console.log("-JSON submitted to host!");
	}]);
});
    
//search api post method
app.post("/api/search", function(req, res, next) {
    var year;
    var id;
    var data;
    async.waterfall([
	function(callback) {
	    switch (req.body.year) {
            case "2013":
		courseDB.get('select * from course2013 where id = ?', [req.body.id], function(err, row) {
                    console.log("searching.... " + req.body.id);
                    if (err) {
			console.log(err)
                    } else {
			data = row;
			callback(null);
                    }
		});
		break;
            case "2014":
		courseDB.get('select * from course2014 where id = ?', [req.body.id], function(err, row) {
                    console.log("searching.... " + req.body.id);
                    if (err) {
			console.log(err)
                    } else {
			data = row;
			callback(null);
                    }
		});
		break;
            case "2015":
		courseDB.get('select * from course2015 where id = ?', [req.body.id], function(err, row) {
                    console.log("searching.... " + req.body.id);
                    if (err) {
			console.log(err)
                    } else {
			data = row;
			callback(null);
                    }
		});
		break;
            case "2016":
		courseDB.get('select * from course2016 where id = ?', [req.body.id], function(err, row) {
                    console.log("searching.... " + req.body.id);
                    if (err) {
			console.log(err)
                    } else {
			data = row;
			callback(null);
                    }
		});
		break;
	    }
	},
	function(callback) {
            data.score = req.body.score;
            data.state = req.body.state;
            var resDataJSON = JSON.stringify(data, null, ' ');
            res.send(resDataJSON);
            res.end();
            console.log("-JSON submitted to host!");
	}]);
});


//main api post method
app.post("/api/csv", function(req, res, next) {
    //init post function local handler
    var resData;
    var resDataJSON;
    var total = [0,0,0,0,0,0,0,0,0,0,0];//a+,a,b,c,d,x,p,f
    var semesterTotal = [0,0,0,0,0,0,0];
    var semesterGPA = [0,0,0,0,0,0,0];
    var subject = [0,0,0,0,0,0,0,0,0,0,0,0];
    var gpa = [0,0,0,0,0,0,0];
    var getCourse=[0,0,0,0];
    var nowCourse=[0,0,0,0];
    var rateA=[0,0,0,0];
    var graduation = 1;      //if there is any problem, this will turns 0.
    var admissionYear;
    admissionYear = getAdmissionYear(req);
    var subjectTemp;
    var gradeTemp;
    var csvColumn;
    console.log("I GOT POST!!");
    async.waterfall([
	function(callback) {
	    for(var i = 0; i < 1000; i++){
		if(req.body["line" + i] == undefined){
		    csvColumn = i;
		    callback(null);
		    break;
		}
	    }
	},
	function(callback) {
	    db.serialize(function() {
		//co(function*() {
		//for (var i = 0; eval("req.body.line" + i) != undefined; i++) {
		var i = [0];
		for(j = 1; j < csvColumn; j++){
		    i.push(j);
		}
		console.log("//" + i);
		async.eachSeries(i, function(i, callback2) {
		    subjectTemp = eval("req.body.line" + i + ".subject");
		    gradeTemp = eval("req.body.line" + i + ".grade");
		    yearTemp = eval("req.body.line" + i + ".year");
		    calcCredit(i, gradeTemp, subjectTemp, total, yearTemp, callback2);
		    console.log("/-i/- " + i + "-" + gradeTemp + "-" + subjectTemp + "-" + yearTemp);
		    console.log("/-total/- " + total);
		},
				 function(){
				     console.log("////////end db");
				     callback(null);
				 });
            });
	},
	function(callback){
	    checkClass(req,nowCourse,getCourse, rateA, callback);
	},
	function(callback) {
	    checkTransition(req,semesterGPA,semesterTotal, admissionYear, callback);
	},
	//Analyze
	/*
	function(callback) {
	    ////////////第一外国語////////////////////
	    db.each("SELECT min, max from common_compulsory where subject = \'第1外国語(英語)\' and depart = 6201 and enter=2014", function(err, row){
     		var xmin=row.min;
     		var xmax=row.max;
		
		var classcode1=[/^31A.*2$/,/^31B.*2$/,/^31C.*2$/,/^31E.*2$/,/^31F.*2$/,/^31G.*2$/];
		var y = countCredit(classcode1, req);
		
		var classcode2=[/^313.*2$/,/^4.*2$/,/^315.*2$/,/^316.*2$/,/^317.*2$/,/^313.*2$/];
		var z = countCredit(classcode2, req);
		
		if(y < 4.5){
		    graduation = 0;
		}
		if(y+z < xmin){
		    graduation = 0;
		    subject[7] += y+z;
		}
		else{
		    subject[7]=min(xmax, y+z);
		}
	    },
		    function(){callback(null);});
	},
	*/
	/*
	function(callback) {
	    ////////////総合1////////////
	    db.each("SELECT min, max from common_compulsory where subject = '総合科目1' and depart = 6201 and enter = 2014", function(err, row) {
		var xmin = row.min,
		    xmax = row.max;
		var classcode1 = [/^11/];
		var classcode2 = [/^13/, /^12/];
		var y = countCredit(classcode1, req);
		if (y == 0) {
		    graduation = 0;
		}
		if (xmin > y) {
		    subject[7] += y;
		} else {
		    subject[7] += min(xmax, y);
		}
	    },
		    function(){callback(null);});
	},
	*/
	/*
	function(callback) {
	    ////////////総合2///////////////
	    db.each("SELECT min, max from common_compulsory where subject = 総合科目2 and depart = 621 and enter = 2014", function(err, row) {
		var x = 0,
		    y = 0,
		    z = 0,
		    A = 0,
		    B = 0,
		    C = 0;
		var Amin, Amax, Bmin, Bmax, Cmin, Cmax, xmin, xmax;
		
		//console.log("総合科目2:" + x);
		
		db.get("SELECT min, max from common_compulsory where subject = '総合科目2-A' and depart = 621 and enter = 2014", function(err, rowA) {
		    Amin = rowA.min;
		    Amax = rowA.max;
		    console.log("総合科目2-A 上限:" + Amax + "下限" + Amin);
		});
		db.get("SELECT min, max from common_compulsory where subject = '総合科目2-B' and depart = 621 and enter = 2014", function(err, rowB) {
		    Bmin = rowB.min;
		    Bmax = rowB.max;
		    console.log("総合科目2-B 上限:" + Bmax + "下限" + Bmin);
		});
		db.get("SELECT min, max from common_compulsory where subject = '総合科目2-C' and depart = 621 and enter = 2014", function(err, rowC) {
		    Cmin = rowC.min;
		    Cmax = rowC.max;
		    //console.log("総合科目2-C 上限:" + Cmax + "下限" + Cmin);
		});
		
		
		//履修データから科目番号1A*****の単位数をAに、1B*****の単位数をBに、1C*****の単位数をCにそれぞれ格納
		var classcode1 = [/^1A/];
		var classcode2 = [/^1B/];
		var classcode3 = [/^1C/];
		A = countCredit(classcode1, req);
		B = countCredit(classcode2, req);
		C = countCredit(classcode3, req);
		if (A < Amin) {
		    graduation = 0;
		} else {
		    y = min(A, Amax);
		}
		if (B < Bmin) {
		    graduation = 0;
		} else {
		    y += min(B, Bmax);
		}
		if (C < Cmin) {
		    graduation = 0;
		} else {
		    y += min(C, Cmax);
		}
		if (y < xmin) {
		    graduation = 0;
		    subject[7] += y;
		} else {
		    subject[7] += min(y, xmax);
		}
	    },
		    function(){callback(null);});
	},
	*/
	/*
	function(callback) {
	    db.each("SELECT min, max from common_compulsory where subject = '総合科目3' and depart = 621 and enter = 2014", function(err, row) {
		var xmin = row.min,
		    xmax = row.max,
		    y = 0;
		//console.log("総合科目3:" + x);
		//履修データから科目番号1D*****,1E*****,1F*****,1G*****の単位数をyにプラス
		var classcode = [/^1D/, /^1E/, /^1F/, /^1G/];
		if (xmin > y) {
		    graduation = 0;
		    subject[7] += y;
		} else {
		    subject[7] += min(y, xmax);
		}
	    },
		    function(){callback(null);});
	},
	*/
	/*
	function(callback) {
	    ///////////体育//////////////////
	    db.each("SELECT min, max from common_compulsory where subject = '体育' and depart = 621 and enter = 2014", function(err, row) {
		var w, xmin = row.min,
		    xmax = row.max,
		    y, z = 0;
		//console.log("体育:" + x);
		
		//履修データから科目番号21*****,25*****の単位数をyに格納
		var classcode1 = [/^21/, /^25/];
		async.waterfall([
		    function(callback2) {
			y = countCredit(classcode1.req);
			//履修データから科目番号22*****の単位数をzに格納
			//履修データから科目番号23*****,24*****,26*****,27*****の単位数をwに格納
		    },
		    function(callback2) {
			if (x > 0) {
			    if (y < 1) {
				graduate = 0;
			    }
			    if (z < 1) {
				graduate = 0;
			    }
			    if (w < (x - 2)) {
				graduate = 0;
			    }
			}
			//}
			//履修データから科目番号28*****の単位数をsubject[4]に格納
		    },
		    function(){callback(null);}
		]);
	    });
	},
	*/
	/*
	function(callback) {
	    var y, xmin, xmax;
	    ////////国語//////////////////////////////////////
	    db.get("SELECT min, max from common_compulsory where subject = '国語' and depart = 6201 and enter = 2014", function(err, row){
		xmin=row.min;
		xmax=row.max;
	    },
		   function() {
		       var classcode=[/^5/];
		       async.waterfall([
			   function(callback2) {
			       y=countCredit(classcode, req, callback2);
			   },
			   function(callback2) {
			       subject[7]+=min(xmax,y);
			       callback2(null);
			   }
		       ]);
		   });
	},
	*/
	/*
	function(callback) {
	    var xmin,xmax,y,z,lang=[0,0,0,0,0,0,0,0];
	    ////////第二外国語//////////////////////////////////
	    db.get("SELECT min, max from common_compulsory where subject = '第2外国語' and depart = 6201 and enter = 2014", function(err, row){
		xmin = row.min;
		xmax = row.max;
	    },
		   function(){
		       var classcode1 = [/^32A.*2$/,/^32B.*2$/,/^32C.*2$/,/^32E.*2$/,/^329.*2$/,/^323.*2$/];
		       var classcode2 = [/^33A.*2$/,/^33B.*2$/,/^33C.*2$/,/^33E.*2$/,/^339.*2$/,/^333.*2$/];
		       var classcode3 = [/^34A.*2$/,/^34B.*2$/,/^34C.*2$/,/^34E.*2$/,/^349.*2$/,/^343.*2$/];
		       var classcode4 = [/^35A.*2$/,/^35B.*2$/,/^35C.*2$/,/^35E.*2$/,/^359.*2$/,/^353.*2$/];
		       var classcode5 = [/^36A.*2$/,/^36B.*2$/,/^36C.*2$/,/^36E.*2$/,/^369.*2$/,/^363.*2$/];
		       var classcode6 = [/^37A.*2$/,/^37B.*2$/,/^37C.*2$/,/^37E.*2$/,/^379.*2$/,/^373.*2$/];
		       var classcode7 = [/^38A.*2$/,/^38B.*2$/,/^38C.*2$/,/^38E.*2$/,/^389.*2$/,/^383.*2$/];
		       var classcode8 = [/^39.*2$/];
		       var classcode9 = [/^324.*2$/,/^334.*2$/,/^344.*2$/,/^354.*2$/,/^364.*2$/,/^374.*2$/,/^384.*2$/];
		       var i = [0,1,2,3,4,5,6,7];
		       async.each(i, function(i, callback2) {
			   lang[0] = countCredit(classcode1,req,callback2);
		       });
		       //z = countCredit(classcode,req);
		       subject[7] += min(max(lang), xmax);
		       callback(null);
		   });
	},
	*/
	function(callback) {
	    console.log("-analyzed");
	    //console.log("///" + getCourse + "---" +  nowCourse);
	    resData = {
		"REQUIREMENT": {
		    "needGRCourse": 124.5,
		    "getGRCourse": (total[0] + total[1] + total[2] + total[3]),
		    "nowGRCourse": (total[5]),
		    "preGRCourse": 0
		},
		"CREDIT": [{
		    "course": "A",
		    "needCourse": 42,
		    "getCourse": getCourse[0],
		    "nowCourse": nowCourse[0],
		    "preCourse": 0,
		    "courseA": rateA[0],
		    "courseSum": getCourse[0]
		}, {
		    "course": "B",
		    "needCourse": 58,
		    "getCourse": getCourse[1],
		    "nowCourse": nowCourse[1],
		    "preCourse": 0,
		    "courseA": rateA[1],
		    "courseSum": getCourse[1]
		}, {
		    "course": "C",
		    "needCourse": 15.5,
		    "getCourse": getCourse[2],
		    "nowCourse": nowCourse[2],
		    "preCourse": 0,
		    "courseA": rateA[2],
		    "courseSum": getCourse[2]
		},{
		    "course": "C_0",
		    "needCourse": 0,
		    "getCourse": getCourse[3],
		    "nowCourse": nowCourse[3],
		    "preCourse": 0,
		    "courseA": rateA[3],
		    "courseSum": getCourse[3]
		}],
		"GRADE_GPA": {
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
		    "creditTransition": [
			{"semester": admissionYear + "/spring", "credit": semesterTotal[0]},
			{"semester": admissionYear + "/autumn", "credit": semesterTotal[1]},
			{"semester": (Number(admissionYear) + 1) + "/spring", "credit": semesterTotal[2]},
			{"semester": (Number(admissionYear) + 1) + "/autumn", "credit": semesterTotal[3]},
			{"semester": (Number(admissionYear) + 2) + "/spring", "credit": semesterTotal[4]},
			{"semester": (Number(admissionYear) + 2) + "/autumn", "credit": semesterTotal[5]}
		    ],
		    "gpaTransition": [
			{"semester": admissionYear + "/spring", "GPA": semesterGPA[0]},
			{"semester": admissionYear + "/autumn", "GPA": semesterGPA[1]},
			{"semester": (Number(admissionYear) + 1) + "/spring", "GPA": semesterGPA[2]},
			{"semester": (Number(admissionYear) + 1) + "/autumn", "GPA": semesterGPA[3]},
			{"semester": (Number(admissionYear) + 2) + "/spring", "GPA": semesterGPA[4]},
			{"semester": (Number(admissionYear) + 2) + "/autumn", "GPA": semesterGPA[5]}
		    ]
		}
	    };
	    callback(null);
	},
	function(callback) {
	    res.contentType('application/json');
	    resDataJSON = JSON.stringify(resData, null, ' ');
	    callback(null);
	},
	function(callback) {
	    res.send(resDataJSON);
	    //res.end();
	    console.log("-JSON submitted to host!");
	    console.log(subject[7]);
	    callback(null);
	}],function(err, arg1, arg2){
	});
});
	 
/*
  Function List
*/

function getCredit(year, classCode) {
    var credit;
    console.log(year);
    switch (year) {
    case "2016":
        courseDB.get('select credit from course2016 where id = ?', [classCode], function(err, row) {
            credit = row.credit;
        });
        break;
    case "2015":
        courseDB.get('select credit from course2015 where id = ?', [classCode], function(err, row) {
                credit = row.credit;
        });
            break;
    case "2014":
        courseDB.get('select credit from course2014 where id = ?', [classCode], function(err, row) {
            credit = row.credit;
        });
        break;
    case "2013":
        courseDB.get('select credit from course2013 where id = ?', [classCode], function(err, row) {
            credit = row.credit;
        });
        break;
        default:
        console.log("// hello default!!");
        break;
    }
    return credit;
}

function check2013(i, subject, grade, total) {
    courseDB.get('select credit,id from course2013 where id = ?', [subject], function(err, row) {
        if (err) {
            console.log(err)
        } else {
            //console.log(row);
            //console.log("2013  " + i + ":" + grade);
            if (grade == "A+") {
                total[0] += row.credit
            }
            if (grade == "A") {
                total[1] += row.credit
            }
            if (grade == "B") {
                total[2] += row.credit
            }
            if (grade == "C") {
                total[3] += row.credit
            }
            if (grade == "D") {
                total[4] += row.credit
            }
            if (grade == "X") {
                total[5] += row.credit
            }
            if (grade == "P") {
                total[6] += row.credit
            }
            if (grade == "F") {
                total[7] += row.credit
            }
        }
    });
}

function check2014(i, subject, grade, total) {
    courseDB.get('select credit,id from course2014 where id = ?', [subject], function(err, row) {
        if (err) {
            console.log(err)
        } else {
            //console.log(row);
            //console.log("2014  " + i + ":" + grade);
            if (grade == "A+") {
                total[0] += row.credit
            }
            if (grade == "A") {
                total[1] += row.credit
            }
            if (grade == "B") {
                total[2] += row.credit
            }
            if (grade == "C") {
                total[3] += row.credit
            }
            if (grade == "D") {
                total[4] += row.credit
            }
            if (grade == "X") {
                total[5] += row.credit
            }
            if (grade == "P") {
                total[6] += row.credit
            }
            if (grade == "F") {
                total[7] += row.credit
            }
        }
    });
}

function check2015(i, subject, grade, total) {
    courseDB.get('select credit,id from course2015 where id = ?', [subject], function(err, row) {
        if (err) {
            console.log(err)
        } else {
            //console.log(row);
            //console.log("2015  " + i + ":" + grade);
            if (grade == "A+") {
                total[0] += row.credit
            }
            if (grade == "A") {
                total[1] += row.credit
            }
            if (grade == "B") {
                total[2] += row.credit
            }
            if (grade == "C") {
                total[3] += row.credit
            }
            if (grade == "D") {
                total[4] += row.credit
            }
            if (grade == "X") {
                total[5] += row.credit
            }
            if (grade == "P") {
                total[6] += row.credit
            }
            if (grade == "F") {
                total[7] += row.credit
            }
        }
    });
}

function check2016(i, subject, grade, total) {
    courseDB.get('select credit,id from course2016 where id = ?', [subject], function(err, row) {
        if (err) {
            console.log(err)
        } else {
            //console.log(row);
            //console.log("2016  " + i + ":" + grade);
            if (grade == "A+") {
                total[0] += row.credit
            }
            if (grade == "A") {
                total[1] += row.credit
            }
            if (grade == "B") {
                total[2] += row.credit
            }
            if (grade == "C") {
                total[3] += row.credit
            }
            if (grade == "D") {
                total[4] += row.credit
            }
            if (grade == "X") {
                total[5] += row.credit
            }
            if (grade == "P") {
                total[6] += row.credit
            }
            if (grade == "F") {
                total[7] += row.credit
            }
        }
    });
}

function countCredit(classCode, req, callback) {
    var cnt;
    for (var i = 0; eval("req.body.line" + i) != undefined; i++) {
        var str = eval("req.body.line" + i + ".subject");
        for (var j = 0; j < classCode.length; j++) {
            if (str.match(classCode[j])) {
            	var tmp=eval("req.body.line" + i + ".credit");
                cnt += Number(tmp);
                console.log("// " + cnt + ":" + i);
		callback(null);
            }
        }
    }
    return cnt;
}

function min(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

///////////////科目区分ごとの分類
function checkClass(req,nowCourse,getCourse,rateA,callback){
    var tmpA=0,tmpB=0,tmpC=0,tmpD=0;
    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
	if(eval("req.body.line" + i + ".classification")=="A"){
	    if(eval("req.body.line" + i + ".grade") == "X"){
		nowCourse[0] += parseFloat(eval("req.body.line" + i + ".credit"));
		//console.log("///" + i + "--" + nowCourse[0] + "---" + eval("req.body.line" + i + ".grade") + " :X--A");
	    }
	    else if(eval("req.body.line" + i + ".grade") != "D" && eval("req.body.line" + i + ".grade") != "F"){
		getCourse[0] += parseFloat(eval("req.body.line" + i + ".credit"));
		//console.log("///" + i + "--" + getCourse[0] + "---" + eval("req.body.line" + i + ".grade") + " :DFx--A");
		if(eval("req.body.line" + i + ".grade") == "A" || eval("req.body.line" + i + ".grade") == "A+"){
		    tmpA += parseFloat(eval("req.body.line" + i + ".credit"));
		}
	    }

	}
	else if(eval("req.body.line" + i + ".classification")=="B"){
	    if(eval("req.body.line" + i + ".grade") == "X"){
		nowCourse[1] += parseFloat(eval("req.body.line" + i + ".credit"));
		//console.log("///" + i + "--" + nowCourse[1] + "---" + eval("req.body.line" + i + ".grade") + " :X--B");
	    }
	    else if(eval("req.body.line" + i + ".grade") != "D" && eval("req.body.line" + i + ".grade") != "F"){
		getCourse[1] += parseFloat(eval("req.body.line" + i + ".credit"));
		//console.log("///" + i + "--" + getCourse[1] + "---" + eval("req.body.line" + i + ".grade") + " :DFx--B");
		if(eval("req.body.line" + i + ".grade") == "A" || eval("req.body.line" + i + ".grade") == "A+"){
		    tmpB += parseFloat(eval("req.body.line" + i + ".credit"));
		}
	    }
	}
	else if(eval("req.body.line" + i + ".classification")=="C"){
	    if(eval("req.body.line" + i + ".grade") == "X"){
		nowCourse[2] += parseFloat(eval("req.body.line" + i + ".credit"));
	    }
	    else if(eval("req.body.line" + i + ".grade") != "D" && eval("req.body.line" + i + ".grade") != "F"){
		getCourse[2] += parseFloat(eval("req.body.line" + i + ".credit"));
		if(eval("req.body.line" + i + ".grade") == "A" || eval("req.body.line" + i + ".grade") == "A+"){
		    tmpC += parseFloat(eval("req.body.line" + i + ".credit"));
		}
	    }
	}
	else if(eval("req.body.line" + i + ".classification")=="C_0"){
	    if(eval("req.body.line" + i + ".grade") == "X"){
		nowCourse[3] += parseFloat(eval("req.body.line" + i + ".credit"));
	    }
	    else if(eval("req.body.line" + i + ".grade") != "D" && eval("req.body.line" + i + ".grade") != "F"){
		getCourse[3] += parseFloat(eval("req.body.line" + i + ".credit"));
		if(eval("req.body.line" + i + ".grade") == "A" || eval("req.body.line" + i + ".grade") == "A+"){
		    tmpD += parseFloat(eval("req.body.line" + i + ".credit"));
		}
	    }
	}
    }
    rateA[0]=tmpA;
    rateA[1]=tmpB;
    rateA[2]=tmpC;
    rateA[3]=tmpD;
    callback(null);
}

/////////////履修開始年度////////////
function getAdmissionYear(req){
    var year=3000;
    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
	if(year > eval("req.body.line" + i + ".year"))year = eval("req.body.line" + i + ".year");
    }
    return year;
}

/////////////修得単位とGPAの推移を計算
function checkTransition(req,semesterGPA,semesterTotal,admissionYear,callback){
    for (var i=0; eval("req.body.line" + i) != undefined ; i++){
	if(eval("req.body.line" + i + ".semester") == "春"){
	    semesterGPA[2*(eval("req.body.line" + i + ".year")-admissionYear)] += parseFloat(culcGPA(req,i));
	    semesterTotal[2*(eval("req.body.line" + i + ".year")-admissionYear)] += parseFloat(eval("req.body.line" + i + ".credit"));
	}
	else if(eval("req.body.line" + i + ".semester") == "秋"){
	    semesterGPA[2*(eval("req.body.line" + i + ".year")-admissionYear)+1] += parseFloat(culcGPA(req,i));
	    semesterTotal[2*(eval("req.body.line" + i + ".year")-admissionYear)+1] += parseFloat(eval("req.body.line" + i + ".credit"));
	}
    }

    for (var i=0; i < 6; i++) {
	//console.log("///// " + i + "---" + semesterGPA[i] + " --- " + semesterTotal[i]);
	if(semesterTotal[i] == 0){
	    break;
	}
	semesterGPA[i] = semesterGPA[i] / semesterTotal[i];
    }
    console.log("//Transition checked!");
    callback(null);
}

function culcGPA(req,i){
    switch (eval("req.body.line" + i + ".grade")){
    case "A+":
	return eval("req.body.line" + i + ".credit")*4.3;
	break;
    case "A":
	return eval("req.body.line" + i + ".credit")*4.0;
	break;
    case "B":
	return eval("req.body.line" + i + ".credit")*3.0;
	break;
    case "C":
	return eval("req.body.line" + i + ".credit")*2.0;
	break;
    default:
	return 0;
	break;
    }
}

function calcCredit(i, gradeTemp, subjectTemp, total, year, callback) {
    courseDB.get('select credit,id from course' + year + ' where id = ?', [subjectTemp], function(err, row) {
	if (err) {
	    console.log(err);
	} else {
	    console.log(row);
	    //console.log("2016  " + i + ":" + gradeTemp);
	    if (gradeTemp == "A+") {
		total[0] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "A") {
		total[1] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "B") {
		total[2] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "C") {
		total[3] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "D") {
		total[4] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "X") {
		total[5] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "P") {
		total[6] += row.credit;
		callback(null);
	    }
	    if (gradeTemp == "F") {
		total[7] += row.credit;
		callback(null);
	    }
	}
	
    }); /*,
		 function(){
		     callback(null);
		 });
*/
}
