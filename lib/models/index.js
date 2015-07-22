'use strict';

var models = exports; exports.constructor = function models(){};

var sequelize = require('sequelize');

var config = require('../config');

/**
 * Initialize the sequelize object and models
 */
models.initialize = function() {
  models.sequelize = new sequelize(config.get().database_url);

  models.Recipe = require('./recipe');
  models.RecipeDirection = require('./recipe_direction');
  models.RecipeIngredient = require('./recipe_ingredient');
  models.RecipeNote = require('./recipe_note');
  models.RecipeSearchItem = require('./recipe_search_item');
  //models.Location = require('./location');

  models._associate();

  return models.sequelize.sync();
};

/**
 * Associate models with each other
 */
models._associate = function() {

  models.Recipe.hasMany(models.RecipeDirection, {
    as: 'directions',
    onDelete: 'CASCADE'
  });
  models.Recipe.hasMany(models.RecipeIngredient, {
    as: 'ingredients',
    onDelete: 'CASCADE'
  });
  models.Recipe.hasMany(models.RecipeNote, {
    as: 'notes',
    onDelete: 'CASCADE'
  });
  models.Recipe.hasMany(models.RecipeSearchItem, {
    as: 'searchItems',
    onDelete: 'CASCADE'
  });
};
