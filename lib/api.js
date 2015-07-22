'use strict';

module.exports = CookbookServer;

var http = require('http');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var recipes = require('./routers/recipes');

var DEFAULT_CONFIG = {
  port: 5000
};

function CookbookServer(config) {
  this._config = _.defaults(config || {}, DEFAULT_CONFIG);
}

CookbookServer.prototype.configure = function() {
  this._app = express();
  this._server = http.createServer(this._app);

  this._app.use(bodyParser.json());

  this._app.use('/recipes', recipes.router());

  this._app.get('/status', function(req, res) {
    res.status(200).send({ status: 'ok' });
  });

  this._app.get('*', function(req, res) {
    res.status(404).send({ status: 'not found' });
  });
};

CookbookServer.prototype.start = function() {
  var port = process.env.PORT || this._config.port;
  this._server.listen(port);
  console.log('Server listening on port', port);
};
