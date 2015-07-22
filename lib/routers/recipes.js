'use strict';

var recipes = exports; exports.cosntructor = function recipes() {};

var express = require('express');

recipes.router = function() {
  var router = new express.Router();

  router.get('/', recipes._getAll);
  router.get('/:id', recipes._getById);

  return router;
};

recipes._getAll = function(req, res) {
  res.status(200).send({ status: 'ok' });
};

recipes._getById = function(req, res) {
  var id = req.params.id;
  res.status(200).send({ status: 'ok', id: id });
};
