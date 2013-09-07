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
