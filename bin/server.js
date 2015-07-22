#!/usr/bin/env node
'use strict';

function main() {
  var config = require('../lib/config');
  var CookbookServer = require('../lib/api').CookbookServer;

  var cookbookServer = new CookbookServer(config.read());

  cookbookServer.configure();
  cookbookServer.start();
}

if (require.main === module) {
  main();
}
