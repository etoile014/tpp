// not in use
var http = require('http');

http.createServer(funtion (requiest, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(80);

console.log('Server running');
