'use strict';

var config = exports; exports.constructor = function config() {};

var _ = require('lodash');

var pkg = require('../package.json');
var configVars = require('../config/server_vars.json');

var DEFAULTS = {
  PORT: 5000
};

config._cache = {};

config.read = function() {
  var self = this;

  this._cache.version = pkg.version;

  var missing = [];
  var envConfig = _.pick(process.env, _.keys(configVars));
  _.defaults(envConfig, DEFAULTS);

  _.each(configVars, function(type, name) {
    var value = self._convert(envConfig[name], type);
console.log(value)
    if (_.isUndefined(value)) {
      missing.push(name);
      return;
    }

    self._cache[name.toLowerCase()] = value;
  });

  if (missing.length > 0) {
    throw new Error('Missing env configs: ' + missing.toString());
  }

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
