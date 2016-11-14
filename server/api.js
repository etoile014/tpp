var express = require("express");
//var app = express();
var bodyParser = require('body-parser');
var app = express();

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
    res.setHeader('Content-Type', 'text/plain');
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.send("Hello! Success Upload!" + str.body.line0.subject );

    //res.end();
    console.log(str.body);
});
