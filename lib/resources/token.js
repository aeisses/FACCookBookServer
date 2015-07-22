'use strict';

var token = exports; exports.constructor = function token() {};

var crypto = require('crypto');

var Q = require('q');
var jwt = require('jsonwebtoken');

token.initialize = function(secret) {
  this._secret = secret;
};

token.generate = function() {
  var self = this;

  return Q.ninvoke(crypto, 'randomBytes', 32)
    .then(function(buffer) {
      var token = jwt.sign({ id: buffer.toString('hex') }, self._secret);
      return token;
    });
};
