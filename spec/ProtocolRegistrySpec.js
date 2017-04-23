var sass = require('node-sass');
var index = require('../src/index.js');

describe('protocol registry', function() {
  var importer, protocolRegistry;

  beforeEach(function() {
    importer = index({ debug: false });
    protocolRegistry = index.protocolRegistry;
  });

  it('can add protocols', function() {
    protocolRegistry.add('path-name:', function(req) {
      return req.pathname;
    });

    var res = importer('path-name://host/file').file;

    protocolRegistry.remove('path-name:');

    expect(res).toEqual("/file");
  });

  it('can remove protocols', function() {
    protocolRegistry.add('can-remove-protocols:', function(req) {
      return req.pathname;
    });

    protocolRegistry.remove('can-remove-protocols:');

    var run = function() {
      return importer.handle('can-remove-protocols://host/file');
    };

    expect(run).toThrowError();
  });

  it('can get existing protocols', function() {
    var run = function(req) {};

    protocolRegistry.add('path-name:', run);

    var get = protocolRegistry.get('path-name:');

    protocolRegistry.remove('path-name:');

    expect(run).toEqual(get);
  });

  it('throws an error when getting non-existant protocols', function() {
    var run = function() {
      protocolRegistry.get('not-found:');
    }

    expect(run).toThrowError();
  });

  it('returns false if a protocol does not exist', function() {
    expect(protocolRegistry.has('lorem-ipsum:')).toBe(false);
  });

  it('has npm out of the box', function() {
    expect(protocolRegistry.has('npm:')).toBe(true);
  });

  it('has bower out of the box', function() {
    expect(protocolRegistry.has('bower:')).toBe(true);
  });
});
