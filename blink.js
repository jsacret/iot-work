var Gpio = require('onoff').Gpio;
var MIC = new Gpio(4, 'in', 'both');
var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
	keyPath: './private.pem.key',
	certPath: './certificate.pem.crt',
	caPath: './ca.pem',
	clientId: 'arn:aws:iot:us-east-1:177496848564:thing/Gun_Shot_Detector_1',
	host: 'a3grlfwcdcdc2g.iot.us-east-1.amazonaws.com'
});
console.log(device);

device.on('connect', function() { 
	console.log('connected');
	device.subscribe('ShotsDetected', function() {console.log('shots detected!')});
 });
device.on('reconnect', function(e) { console.log('reconnecting' + e); });
device.on('message', function(topic, payload) { console.log('message', topic, payload.toString())});
device.on('error', function(error) { console.log(error); });
device.on('offline', function(e) { console.log('offline' + e); });
device.on('packetsend', function() {console.log('sending packet'); });
device.on('packetreceive', function() { console.log('received packet'); });

MIC.watch(function(err, value) {
	console.log('watched');
	console.log(value);
	device.publish('ShotsDetected', JSON.stringify({id: 1, name: 'test', confirmed: false}));
});

