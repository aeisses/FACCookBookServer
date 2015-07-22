'use strict';

var recipeRouter = exports; exports.cosntructor = function recipeRouter() {};

var express = require('express');

var recipe = require('../recipe');

recipeRouter.router = function() {
  var router = new express.Router();

  router.get('/', recipeRouter._list);
  router.get('/:id', recipeRouter._get);
  router.post('/:id/vote', recipeRouter._vote);
  router.post('/', recipeRouter._create); // TODO auth me?
  router.put('/:id', recipeRouter._update);

  return router;
};

recipeRouter._list = function(req, res) {
  recipe.list(req.query).then(function(results) {
    res.json({
      recipes: results
    });
  }).catch(function(err) {
    console.error('Failed to list recipes', err);
    res.statusCode = 500;
    res.json({
      errors: ['Internal server error']
    })
  });
};

recipeRouter._get = function(req, res) {
  var id = req.params.id;
  var filter = req.query.filter;
  var sort = req.query.sort;
  res.status(200).send({ status: 'ok', id: id, filter: filter, sort: sort });
};

recipeRouter._vote = function(req, res) {
  var id = req.parmas.id;
  res.status(200).send({ status: 'ok', id: id });
};

recipeRouter._create = function(req, res) {
  var recipe = req.body;
  res.status(201).send({ status: 'ok', recipe: recipe });
};

recipeRouter._update = function(req, res) {
  var id = req.params.id;
  res.status(200).send({ status: 'ok', id: id });
};
