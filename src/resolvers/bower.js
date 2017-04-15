var path = require('path');
var resolver = require('resolve-bower');

module.exports = function(req) {
  // This is inside the function as some projects may not have bower
  // and we don't want to make it a dependency
  var bower = require('bower');

  // If we're requesting the root of the package
  try {
    if ([null, '/'].indexOf(req.pathname) != -1) {
      // Try and load the main file
      return resolver.sync(req.host, {
        basedir: bower.config.cwd,
        moduleDirectory: bower.config.directory
      });
    }
  } catch (e) {
    // Do nothing on error, let SASS handle it
  }

  return resolver.sync(
    req.host + req.path, {
      isFile: function() {
        return true;
      }, // Let SASS handle it from here
      basedir: bower.config.cwd,
      moduleDirectory: bower.config.directory
    }
  );
};