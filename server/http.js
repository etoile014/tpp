var http = require('http');

http.createServer(function (requiest, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(12000);

console.log('Server running');
