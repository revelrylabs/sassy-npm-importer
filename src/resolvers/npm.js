var path = require('path');
var resolver = require('resolve');

module.exports = function(req) {
  // If we're requesting the root of the package
  try {
    if ([null, '/'].indexOf(req.pathname) != -1) {
      // Try and load the main file
      return resolver.sync(req.host, {
        basedir: path.resolve(process.cwd())
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
      basedir: path.resolve(process.cwd())
    }
  );
};