'use strict';

var recipes = exports; exports.constructor = function recipes(){};

var Q = require('q');
var _ = require('lodash');

var config = require('./config');
var models = require('./models/index');

var DEFAULT_ORDER = 'DESC';
var DEFAULT_SORT = 'updatedDate';

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
        models.RecipeCategory.bulkCreate(data.category, txn),
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
  // column name : should be converted to object with key
  var columns = {
    'notes': false,
    'ingredients': false,
    'directions': false,
    'searchItems': 'keyword',
    'category': 'category'
  };

  _.each(_.keys(columns), function(col) {
    var key = columns[col] || null;
    data[col] = _.map(data[col], function(obj) {
      if (key) {
        var value = obj;
        obj = {};
        obj[key] = value;
      }

      obj.recipe_id = id;
      return obj;
    });
  });

  return data;
};

/**
 * List recipes
 *
 * @param {object} opts - Filtering, pagination and sorting
 */
recipes.list = function(opts) {
  var order = opts.order || DEFAULT_ORDER;
  var sort = opts.sort || DEFAULT_SORT;
  var where = {};
  var limit;

  // Lookup only featured recipes
  if (!_.isUndefined(opts.featured)) {
    where.featured = true;
  }

  // Only return popular results
  if (!_.isUndefined(opts.popular)) {
    sort = 'favourites';
    order = 'DESC';
    limit = config.get().popular_limit;

  // Return results since a particular date
  } else if (!_.isUndefined(opts.since)) {
    where.updatedDate =  { gt: opts.since };
  }

  var lookup = {
    where: where,
    limit: limit,
    order: [[sort, order.toUpperCase()]],
    include: recipes.list._include()
  };

  return models.Recipe.findAll(lookup).then(function(results) {
    return _.map(results, function(recipe) {
      return recipe.schemaFormat()
    });
  });
};

/**
 * Get recipe by ID
 *
 * @param {integer} id
 */
recipes.get = function(id) {
  var lookup = {
    where: {
      id: id
    },
    include: recipes.list._include()
  };
  return models.Recipe.findOne(lookup).then(function(result) {
    if (!result) {
      return [];
    }
    return result.schemaFormat();
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
      model: models.RecipeCategory,
      as: 'category',
      attributes: ['category']
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
  ];
};
