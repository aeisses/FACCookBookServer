'use strict';

var recipes = exports; exports.cosntructor = function recipes() {};

var express = require('express');

recipes.router = function() {
  var router = new express.Router();

  router.get('/', recipes._get);
  router.get('/:id', recipes._get);
  router.post('/:id/vote', recipes._vote);
  router.post('/', recipes._create); // TODO auth mw?
  router.put('/:id', recipes._update);

  return router;
};

recipes._get = function(req, res) {
  var id = req.params.id; // no id, get all
  var filter = req.query.filter;
  var sort = req.query.sort;
  res.status(200).send({ status: 'ok', id: id, filter: filter, sort: sort });
};

recipes._vote = function(req, res) {
  var id = req.parmas.id;
  res.status(200).send({ status: 'ok', id: id });
};

recipes._create = function(req, res) {
  var recipe = req.body;
  res.status(201).send({ status: 'ok', recipe: recipe });
};

recipes._update = function(req, res) {
  var id = req.params.id;
  res.status(200).send({ status: 'ok', id: id });
};
