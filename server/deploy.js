/* express server for git manual deploy over http socket */
/* Auth: Yuki KOYAMA<je6hbc@d-io.com> */
/* here below are following http://yourhost/ and you can access from browser or any get access method
   "git/branch": echo current branch
   "git/status": echo git status
   "git/master": exec"git checkout -b master && git pull origin master"
   "git/develop": exec"git checkout -b develop && git pull origin develop"
   "git/deploy": exec"git checkout -b deploy && git pull origin deploy"
   "?c1= ,c2= ,c3= ": exec any user defined command (not recommanded!)
   "pm2": echo pm2 status
*/

var express = require("express");
var app = express();

var exec = require('child_process').exec;
var sleep = require('sleep-async')();

//listeng server
var server = app.listen(12000, function(){
    console.log("Node.js is running to listen port: " + server.address().port + "(in container)");
});

//deploy api
app.get("/git/branch", function(req, res, next){
    var data;
    res.writeHead(200, {'Content-Type': 'text/html'});
    exec('git branch', function(err, stdout, stderr){
	data = stdout;
    });
    sleep.sleep(2000, function(){
	res.write(data);
	res.end();
	console.log(data);
	console.log("app.get exec git branch");
    });
});

app.get("/git/develop", function(req, res, next){
    var data;
    res.writeHead(200, {'Content-Type': 'text/html'});
    exec('git checkout -b develop && git pull origin develop', function(err, stdout, stderr){
	data = stdout;
    });
    sleep.sleep(2000, function(){
	res.write(data);
	res.end();
	console.log(data);
	console.log("app.get exec git pull develop");
    });
});

app.get("/git/master", function(req, res, next){
    var data;
    res.writeHead(200, {'Content-Type': 'text/html'});
    exec('git checkout -b develop && git pull origin develop', function(err, stdout, stderr){
	data = stdout;
    });
    sleep.sleep(2000, function(){
	res.write(data);
	res.end();
	console.log(data);
	console.log("app.get exec git pull master");
    });
});
