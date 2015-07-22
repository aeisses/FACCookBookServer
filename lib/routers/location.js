'use strict';

var location = exports; exports.constructor = function location() {};

var express = require('express');

location.router = function() {
  var router = new express.Router();

  router.get('/', location._get);
  router.get('/:id', location._get);
  router.post('/', location._create);
  router.put('/:id', location._update);

  return router;
};

location._get = function(req, res) {
  var id = req.params.id; // no id, get all;
  res.status(200).send({ status: 'ok', id: id });
};

location._create = function(req, res) {
  var location = req.body;
  res.status(201).send({ status: 'ok', location: location });
};

location._update = function(req, res) {
  var id = req.params.id;
  res.status(200).send({ status: 'ok', id: id });
};
