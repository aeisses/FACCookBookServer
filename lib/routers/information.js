'use strict';

var information = exports; exports.constructor = function information() {};

var express = require('express');

var config = require('../config');

information.router = function() {
  var router = new express.Router();

  router.get('/', information._get);

  return router;
};

information._get = function(req, res) {
  res.status(200).send({
    version: config.get().version,
    baseMediaUrl: config.get().base_media_url
  });
};
