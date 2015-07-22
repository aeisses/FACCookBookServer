'use strict';

var assert = require('assert');

var Bootstrap = require('../lib/bootstrap');
var Client = require('../lib/client');

describe('Server Integration', function() {

  var strap = new Bootstrap();
  var client = new Client(strap.config());

  before(function(done) {
    strap.start(done);
  })
  after(function(done) {
    strap.stop(done);
  });
  
  it('returns 200 ok for /status route', function (done) {
    client.request({ path: '/status' }, function (err, res, body) {
      if (err) {
        return done(err);
      }

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(
        res.headers['content-type'], 'application/json; charset=utf-8');

      assert.ok(body);
      assert.strictEqual(body.status, 'ok');

      done();
    });
  });

  it('returns 404 not found for unknown route', function (done) {
    client.request({ path: '/hello/are/you/here'}, function (err, res, body) {
      if (err) {
        return done(err);
      }

      assert.strictEqual(res.statusCode, 404);

      assert.ok(body);
      assert.strictEqual(body.status, 'not found');

      done();
    });
  });
});
