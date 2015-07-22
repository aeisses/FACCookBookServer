'use strict';

var config = exports; exports.constructor = function config() {};

var _ = require('lodash');

var pkg = require('../package.json');
var configVars = require('../config/server_vars.json');

config._cache = {};

config.read = function() {
  var self = this;

  this._cache.version = pkg.version;

  _.each(configVars, function(type, name) {
    var value = self._convert(process.env[name], type);

    if (_.isUndefined(value)) {
      return;
    }

    self._cache[name.toLowerCase()] = value;
  });

  return this.get();
};

config.get = function() {
  return this._cache;
};

config._convert = function(value, type) {
  if (!value) {
    return undefined;
  }

  switch(type) {
    case 'number':
      value = Number(value);
      break;
    case 'boolean':
      value = Boolean(value);
      break;
  }

  return value;
};
