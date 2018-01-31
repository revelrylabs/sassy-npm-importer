var url = require('url');
var path = require('path');
var resolver = require('resolve');

module.exports = function (options) {
  this.options = options || {};

  if (this.options.prefix != null) {
    if (typeof(this.options.prefix) !== 'string') {
      throw new Error('options.prefix must be string');
    }
  }

  this.debug = function () {
    if (this.options.debug) {
      console.log.apply(console, arguments);
    }
  }

  // The actual importer function.
  this.handle = function (req, prev) {
    // If a prefix is defined, rewrite to use npm's libraries
    if (this.options.prefix) {
      req = req.replace(new RegExp("^" + this.options.prefix, "g"), "npm://");
    }

    // Convert the URL from a String to an Object
    req = url.parse(req);

    // If this is not a known protocol, do nothing
    if (req.protocol != 'npm:') {
      return null;
    }

    this.debug('Source: ' + req.href);

    var res = this.resolve(req);
    this.debug('Destination: ' + res);

    return {
      file: res
    };
  };

  this.resolve = function (req) {
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
  }
}
