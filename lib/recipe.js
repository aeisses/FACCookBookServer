'use strict';

var recipes = exports; exports.constructor = function recipes(){};

var Q = require('q');
var _ = require('lodash');

var models = require('./models/index');

/**
 * Create a new recipe
 *
 * @param {object} data - Schema-compatible recipe object
 */
recipes.create = function(data) {
  return models.sequelize.transaction(function(t) {
    var txn = { transaction: t };
    return models.Recipe.create(data, txn).then(function(recipe) {
      data = recipes.create._appendRecipeId(recipe.id, data);

      return Q.all([
        models.RecipeNote.bulkCreate(data.notes, txn),
        models.RecipeDirection.bulkCreate(data.directions, txn),
        models.RecipeSearchItem.bulkCreate(data.searchItems, txn),
        models.RecipeIngredient.bulkCreate(data.ingredients, txn),
      ]);
    });
  });
};

/**
 * Adjust json data to format required for postgres transaction
 *
 * @param {integer} id - Recipe id
 * @param {object} data - Recipe object
 */
recipes.create._appendRecipeId = function(id, data) {
  data.notes = _.map(data.notes, function(note) {
    note.recipe_id = id;
    return note;
  });

  data.ingredients = _.map(data.ingredients, function(ingredient) {
    ingredient.recipe_id = id;
    return ingredient;
  });

  data.directions = _.map(data.directions, function(direction) {
    direction.recipe_id = id;
    return direction;
  });

  data.searchItems = _.map(data.searchItems.split(', '), function(keyword) {
    return {
      recipe_id: id,
      keyword: keyword
    };
  });

  return data;
};

/**
 * List recipes
 *
 * @param {object} opts - Filtering, pagination and sorting
 */
recipes.list = function(opts) {
  return models.Recipe.findAll({
    include: recipes.list.include()
  });
};

/**
 * Specify the models to include with recipes lookup result
 */
recipes.list._include = function() {
  return [
    // Directions
    {
      model: models.RecipeDirection,
      as: 'directions',
      attributes: ['direction']
    },
    // Search Items
    {
      model: models.RecipeSearchItem,
      as: 'searchItems',
      attributes: ['keyword']
    },
    // Ingredients
    {
      model: models.RecipeIngredient,
      as: 'ingredients',
      attributes: ['amount', 'ingredient', 'item']
    },
    // Notes
    {
      model: models.RecipeNote,
      as: 'notes',
      attributes: ['note']
    },
  ]
};
