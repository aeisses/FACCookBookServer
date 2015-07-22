'use strict';

var _ = require('lodash');

var CookbookServer = require('../../lib/api').CookbookServer;

module.exports = Bootstrap;

var DEFAULT_CONFIG = {
  port: 7000
};

function Bootstrap (cfg) {
  cfg = _.defaults(cfg || {}, DEFAULT_CONFIG);

  this._cbServer = new CookbookServer(cfg);
  this._cbServer.configure();
}

Bootstrap.prototype.config = function () {
  return this._cbServer._config;
};

Bootstrap.prototype.start = function (cb) {
  this._cbServer.start(cb);
};

Bootstrap.prototype.stop = function (cb) {
  this._cbServer.stop(cb);
};
