'use strict';

var sequelize = require('sequelize');

var models = require('./index');

var schema = {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true 
  },
  recipe_id: {
    allowNull: false,
    type: sequelize.INTEGER,
  },
  category: {
    allowNull: false,
    type: sequelize.STRING,
  },
};

var options = {
  underscored: true
};

module.exports = models.sequelize.define('recipe_category', schema, options);
