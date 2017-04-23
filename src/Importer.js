var url = require('url');
var path = require('path');
var resolve = require('resolve');

class Importer {

  constructor(options) {
    this.debug = false;
    this.prefix = null;

    this.setDebug(options.debug);
    this.setPrefix(options.prefix);
  }

  log() {
    if (this.debug) {
      console.log.apply(console, arguments);
    }
  }

  // The actual importer function.
  handle(req, prev) {
    // If a prefix is defined, rewrite to use npm's packages
    if (this.prefix) {
      req = req.replace(new RegExp("^" + this.prefix, "g"), "npm://");
    }

    // Convert the URL from a String to an Object
    req = url.parse(req);

    // If the protocol is registered, then run the conversion
    if (req.protocol != "npm:") {
      return null;
    }

    this.log('Source: ' + req.href);

    var resolver = function (req) {
      // If we're requesting the root of the package
      try {
        if ([null, '/'].indexOf(req.pathname) != -1) {
          // Try and load the main file
          return resolve.sync(req.host, {
            basedir: path.resolve(process.cwd())
          });
        }
      } catch (e) {
        // Do nothing on error, let SASS handle it
      }

      return resolve.sync(
        req.host + req.path, {
          isFile: function() { return true; }, // Let SASS handle it from here
          basedir: path.resolve(process.cwd())
        }
      );
    }

    var res = resolver(req);
    this.log('Destination: ' + res);

    return { file: res };
  };

  /**
   * Accessor/Mutator: prefix
   */

  setPrefix(prefix) {
    if (prefix == null) {
      this.prefix = null;
      return;
    }

    if (typeof(prefix) === 'string') {
      this.prefix = prefix;
      return;
    }

    throw new Error('Prefix must be string');
  }

  getPrefix() {
    return this.prefix;
  }

  setDebug(debug) {
    this.debug = (debug == true);
  }

  getDebug() {
    return this.debug;
  }
}

module.exports = Importer;
