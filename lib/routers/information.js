'use strict';

var information = exports; exports.constructor = function information() {};

var express = require('express');

information.router = function() {
  var router = new express.Router();

  router.get('/', information._get);

  return router;
};

information._get = function(req, res) {
  res.status(200).send({ status: 'ok' });
};
