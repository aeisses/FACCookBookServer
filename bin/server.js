#!/usr/bin/env node
'use strict';

function main() {
  var config = require('../lib/config');
  var CookbookServer = require('../lib/api').CookbookServer;

  var cookbookServer = new CookbookServer(config.read());

  return cookbookServer.configure()
    .then(function() {
      return cookbookServer.start();
    })
    .fail(function(err) {
      console.log('Failed to start server:', err.message);
      process.exit(1);
    });
}

if (require.main === module) {
  return main();
}
