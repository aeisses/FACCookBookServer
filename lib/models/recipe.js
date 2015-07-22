'use strict';

var sequelize = require('sequelize');

var models = require('./index');

var schema = {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  addedDate: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
  updatedDate: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
  title: {
    allowNull: false,
    type: sequelize.STRING,
  },
  season: {
    type: sequelize.STRING,
  },
  type: {
    type: sequelize.STRING,
  },
  /*
   * To be imported from related tables:
   *  - incredients
   *  - directions
   *  - searchItems
   *  - notes
   */
};

var options = {
  underscored: true
};

module.exports = models.sequelize.define('recipe', schema, options);
