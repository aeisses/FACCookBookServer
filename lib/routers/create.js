'use strict';

var create = exports; exports.constructor = function create() {};

var express = require('express');

var config = require('../config');
var token = require('../resources/token');

create.router = function() {
  var router = new express.Router();

  router.get('/', create._get);

  return router;
};

create._get = function(req, res) {
  token.generate()
    .then(function(token) {
      res.status(201).send({
        version: config.get().version,
        baseMediaUrl: config.get().base_media_url,
        token: token
      });
    })
    .fail(function(err) {
      res.status(500).send({ error: err });
    });
};
