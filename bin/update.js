#!/usr/bin/env node
'use strict';

var async = require('async');
var request = require('request');
var argv = require('minimist')(process.argv.slice(2));

function main() {
  var url = argv.url;
  if (!url) {
    throw new Error('url option must be supplied');
  }

  request(url, function(err, res, body) {
    if (err) {
      console.error('Failed to retrieve recipes json');
      throw err;
      process.exit(1);
    }

    var data;
    try {
      data = JSON.parse(body);
    } catch(err) {
      console.error('Failed to parse JSON');
      throw err;
      process.exit(1);
    }

    var endpoint = argv.endpoint || 'https://faccookbook.herokuapp.com';

    async.each(data.recipes, function(recipe, next) {
      request({
        url: endpoint + '/recipes',
        method: 'patch',
        json: recipe
      }, function(err, res, body) {
        if (err) {
          return next(err);
        }
        if (body.errors) {
          console.error('Failed to insert', {
            recipe: recipe.id,
            errors: body.errors
          });
          return next();
        }

        next();
      });
    }, function(err) {
      if (err) {
        throw err;
        process.exit(1);
      }

      console.log('Done');
      process.exit(0);
    })
  });
}

if (require.main === module) {
  return main();
}
