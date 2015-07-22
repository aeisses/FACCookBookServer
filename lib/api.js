'use strict';

var api = exports; exports.constructor = function api() {};

var http = require('http');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var recipes = require('./routers/recipes');
var location = require('./routers/location');
var information = require('./routers/information');

var DEFAULT_CONFIG = {
  port: 5000
};

function CookbookServer(config) {
  this._config = _.defaults(config || {}, DEFAULT_CONFIG);
}

api.CookbookServer = CookbookServer;

CookbookServer.prototype.configure = function() {
  this._app = express();
  this._server = http.createServer(this._app);

  this._app.use(bodyParser.json());

  this._app.use('/recipes', recipes.router());
  this._app.use('/location', location.router());
  this._app.use('/information', information.router());

  this._app.get('/status', function(req, res) {
    res.status(200).send({ status: 'ok' });
  });

  this._app.get('*', function(req, res) {
    res.status(404).send({ status: 'not found' });
  });
};

CookbookServer.prototype.start = function() {
  this._server.listen(this._config.port);
  console.log('Server listening on port', this._config.port);
};
