#!/usr/bin/env node
'use strict';

function main() {
  var CookbookServer = require('../lib/api');
  var cookbookServer = new CookbookServer();

  cookbookServer.configure();
  cookbookServer.start();
}

if (require.main === module) {
  main();
}
