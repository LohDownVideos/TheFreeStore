var express = require('express');

var config = require('./config');

var app = express();
var events = generateEvents();

app.use(express.static(__dirname + '/' + config.webserver.static));
app.use(express.bodyParser());

app.get('/api/events', function(req, res) {
  res.json({
    "events": events
  });
});

app.put('/api/notification-requests', function(req, res) {
	var eventId = req.body['event-id'];
	var phoneNumber = req.body['phone-number'];
	var emailAddress = req.body['email-address']; 
	
	if(phoneNumber) {
		var request = requre('request');
		request.post(
			'twillioapi',
			function(error, response, body) {
				if(!error && response.statusCode == 200) {
					// success
					var accountSid = 'ACa098428dff1a91c937c9a0e532305b06';
					var authToken = 'd2112b57029e7a9202330311fd767685';
					var client = require('twilio')(accountSid, authToken);
					client.sms.messages.create({
						body: "FeedMe event added: " + eventId,
						to: phoneNumber,
						from: "+18147463996"
					}, function(err, message) {
						if(err) {
							var errorMsg = 'Error in sending message:' + err;
							console.log(errorMsg);
							req.send(500, errorMsg);
						}
					});
				}
			}
		);
		
	} else {
		
	}
});

app.put('/api/events', function(req, res) {
  events.push(req.body);
});

app.listen(config.webserver.port, config.webserver.host);

function generateEvents() {
  var events = [];
  for (var i = 0; i < 100; i++) {
    events.push({
      latitude: i,
      longitude: i,
      room: 'Lounge ' + i,
      name: 'Event ' + i,
      sponsor: 'Sponsor ' + i,
      address: '71' + i + ' Chessie Crossing Way',
      city: 'Woodbine',
      state: 'Maryland',
      zipcode: 21797,
      food: [
        {
          name: 'PepperoniPizza',
          generalAmount: 'more than 50',
          vendor: 'unknown',
          quality: 100
      }, {
          name: 'Lobster',
          generalAmount: 'about 10',
          vendor: 'Phillips Buffet',
          quality: 100
      }],
      instructions: 'Swipe your Student ID card',
      restrictions: 'ID card required'
    });
  }
  return events;
}
