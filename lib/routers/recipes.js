'use strict';

var recipeRouter = exports; exports.cosntructor = function recipeRouter() {};

var _ = require('lodash');
var express = require('express');

var recipe = require('../recipe');

recipeRouter.router = function() {
  var router = new express.Router();
  var single = new express.Router();

  router.post('/', recipeRouter._create);
  router.get('/', recipeRouter._list);
  router.use('/:id', recipeRouter._middleware, single);
  single.get('/', recipeRouter._get);
  single.post('/vote', recipeRouter._vote);
  single.patch('/', recipeRouter._update);

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

recipeRouter._middleware = function(req, res, next) {
  recipe.get(req.params.id).then(function(recipe) {
    if (!recipe || !_.isFunction(recipe.get)) {
      res.statusCode = 404;
      return res.json({
        errors: ['Not found']
      });
    }

    req.targetModel = recipe;
    req.targetModelData = recipe.schemaFormat();

    next();
  }).catch(function(err) {
    console.error('Failed to lookup recipe', err);
    res.statusCode = 500;
    res.json({
      errors: ['Internal server error']
    });
  });
};

recipeRouter._get = function(req, res) {
  return res.json({
    recipes: [ req.targetModelData ]
  });
};

recipeRouter._vote = function(req, res) {
  var id = req.parmas.id;
  res.status(200).send({ status: 'ok', id: id });
};

recipeRouter._create = function(req, res) {
  recipe.create(req.body).then(function(result) {
    return recipe.get(req.body.id).then(function(data) {
      res.statusCode = 201;
      res.json({
        recipes: [
          data
        ]
      });
    });
  }).catch(function(err) {
    console.error('Failed to create recipe', err);
    if (err.name === 'SequelizeValidationError') {
      res.statusCode = 400;
      return res.json({
        errors: err.errors
      });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      res.statusCode = 400;
      return res.json({
        errors: err.errors
      });
    }

    res.statusCode = 500;
    res.json({
      errors: ['Internal server error']
    });
  });
};

recipeRouter._update = function(req, res) {
  _.each(req.body, function(val, key) {
    req.targetModel[key] = val;
  });

  req.targetModel.updatedDate = new Date();
  req.targetModel.save().then(function() {
    res.json({
      recipes: [
        req.targetModel.schemaFormat()
      ]
    })
  }).catch(function(err) {
    console.error('Failed to update recipe', err);
    if (err.name === 'SequelizeValidationError') {
      res.statusCode = 400;
      return res.json({
        errors: err.errors
      });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      res.statusCode = 400;
      return res.json({
        errors: err.errors
      });
    }

    res.statusCode = 500;
    res.json({
      errors: ['Internal server error']
    });
  });
};
