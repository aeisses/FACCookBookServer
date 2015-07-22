'use strict';

var _ = require('lodash');
var sequelize = require('sequelize');

var models = require('./index');

var schema = {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  favourites: {
    type: sequelize.INTEGER,
    defaultValue: 0,
  },
  featured: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
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
  underscored: true,
  instanceMethods: {
    schemaFormat: function() {
      var plain = this.get({ plain: true });
      plain.category = _.pluck(plain.category, 'category');
      plain.searchItems = _.pluck(plain.searchItems, 'keyword');
      delete plain.favourites;
      delete plain.featured;
      return plain;
    }
  }
};

module.exports = models.sequelize.define('recipe', schema, options);
