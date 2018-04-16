const http = require('http');
const port = 80;

const requestHandler = (request, response) => {
	var count = Math.floor(Math.random() * Math.floor(5));
	var devices = [];
	for(i = 0; i < count; i++){
		var device = Math.floor(Math.random() * Math.floor(15));
		devices.push({
			device,
			decibels: Math.floor(Math.random() * Math.floor(700))+700
		});
	}
	response.end(JSON.stringify(devices));
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
});
