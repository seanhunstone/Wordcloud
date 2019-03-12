var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('Hello World!');
}).listen(8080);
// Console will print the message
console.log('Server running at http://localhost:8080/');
