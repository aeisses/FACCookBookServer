
var fs = require('fs');
var restify = require("restify");
var server = restify.createServer();

function getrespond(req, res, next) {a
// Can send JSON response here
  res.send('Get: Recipe!');
  return next();
}
 
function updaterespond(req, res, next) {
// I can send json respons back by passing JSON objects through the send command
  res.send({Update:  req.params.date});
  return next();
}

function getimage(req, res, next) {
  // Need to figure out how to load images on heroku.
  var img = fs.readFileSync('./'+req.params.image);
  res.writeHead( 200, {'Content-Type': 'image/png' });
  res.send(img, 'binary');
}

// Add rest calls here
server.get('/recipe', getrespond);
server.get('/update/:date', updaterespond);
 
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log("Listening on " + port);
});
