'use strict';

var api = exports; exports.constructor = function api() {};

var http = require('http');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var models = require('./models');
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

  return models.initialize();
};

CookbookServer.prototype.start = function(cb) {

  cb = cb || function () {};

  var port = process.env.PORT || this._config.port;
  this._server.listen(port, function(err) {
    if (err) {
      console.log('Could not start server: ', err)
      return cb(err);
    }

    console.log('Server listening on port', port);
    cb();
  });
};

CookbookServer.prototype.stop = function (cb) {

  cb = cb || function () {};

  this._server.close(function(err) {
    if (err) {
      console.log('Could not stop server: ', err);
      return cb(err);
    }

    console.log('Server has stopped successfully');
    cb();
  });
};
