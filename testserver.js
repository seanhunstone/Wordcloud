var http = require('http');
var fs = require('fs');
var d3 = require('d3');

function onRequest(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./speechToTextConverter1.html', null, function(error, data) {
		if(error) {
			response.writeHead(404);
			response.write('File not found!');
		} else {
			response.write(data);
		}
		response.end();
	});
	
	
}
http.createServer(onRequest).listen(8080);