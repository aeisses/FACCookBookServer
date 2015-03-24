
var fs = require('fs');
var restify = require("restify");
var server = restify.createServer();

function getrespond(req, res, next) {
  res.send('Get: Recipe!');
  return next();
}
 
function updaterespond(req, res, next) {
  res.send({Update:  req.params.date});
  return next();
}

function getimage(req, res, next) {
  var img = fs.readFileSync('./'+req.params.image);
  res.writeHead( 200, {'Content-Type': 'image/png' });
  res.send(img, 'binary');
}

server.get('/recipe', getrespond);
server.get('/update/:date', updaterespond);
 
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log("Listening on " + port);
});
