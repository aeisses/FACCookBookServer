'use strict';

var url = require('url');

var _ = require('lodash');
var request = require('request');

module.exports = Client;

function Client(opts) {
  if (!opts || !_.isObject(opts)) {
    throw new Error('You must provide an opts object');
  }

  if (!opts.port || !_.isNumber(opts.port)) {
    throw new Error('You must provide a port');
  }

  if (opts.headers && !_.isObject(opts.headers)) {
    throw new Error('Headers must be an object');
  }

  this.secure = opts.secure || false;
  this.host = opts.host || 'localhost';
  this.port = opts.port;
  this.headers = opts.headers || {}; // Default headers
}

Client.prototype.request = function(opts, cb) {
  if (!opts || !_.isObject(opts)) {
    throw new Error('You must provide an opts object');
  }
  if (!cb || !_.isFunction(cb)) {
    throw new Error('You must provide a callback');
  }
  if (opts.json && opts.body) {
    throw new Error('You cannot specify a json and body at the same time');
  }

  var protocol = (this.secure) ? 'https' : 'http';

  var nonStandardPort = (!_.include([80, 443], this.port));
  var host = this.host;
  if (nonStandardPort) {
    host = this.host + ':' + this.port;
  }

  var apiUrl = url.format({
    protocol: protocol,
    host: host,
    pathname: opts.path,
    query: opts.query
  });

  var reqOpts = {
    url: apiUrl,
    method: opts.method || 'GET',
    json: opts.json,
    headers: opts.headers,
    body: opts.body,
    strictSSL: false,
    timeout: 2500 // This shouldn't need to be this high
  };

  var self = this;
  request(reqOpts, function (err, res, data) {
    if (err) {
      return cb(err);
    }

    // Assume if there is a body, it's JSON
    if (data && _.isString(data)) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        log.error('Error parsing response', data);
        return cb(err);
      }
    }

    cb.apply(null, [err, res, data]);
  });
};
