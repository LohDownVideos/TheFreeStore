var express = require('express');

var config = require('./config');

var app = express();
var foodData = generateFood();

app.use(express.static(__dirname + '/' + config.webserver.static));
app.use(express.bodyParser());

app.get('/api/food', function(req, res) {
  res.json({
    "food": foodData
  });
});

app.put('/api/food', function(req, res) {
  foodData.push(req.body);
});

app.listen(config.webserver.port, config.webserver.host);

function generateFood() {
  var food = [];
  for (var i = 0; i < 100; i++) {
    food.push({
      food: 'pizza' + i,
      instructions: 'Requires a UMD Student ID',
      sponsor: 'PennApps',
      latitude: i,
      longitude: i,
      address: '713 Chessie Crossing Way, Woodbine, MD 21797',
      startTime: new Date(i),
      endTime: new Date(i + 1000)
    });
  }
  return food;
}
