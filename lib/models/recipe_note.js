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
  note: {
    allowNull: false,
    type: sequelize.TEXT,
  },
};

var options = {
  timestamps: false,
  underscored: true
};

module.exports = models.sequelize.define('recipe_note', schema, options);
