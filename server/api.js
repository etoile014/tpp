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
    var str = req;
    //res.setHeader('Content-Type', 'text/plain');
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.send("Hello! Success Upload!" + str.body.line0.subject );
    res.render('main.ejs', {title1: 'exposed via res.render', body: 'This is body!!', line3: str.body.line3.subject});
    res.end();
    console.log(str.body);
});
