var url = require('url');
var protocolRegistry = require('./ProtocolRegistry.js');

class Importer {

  constructor(options) {
    this.options = options || {};

    if (this.options.prefix != null) {
      if (typeof(this.options.prefix) !== 'string') {
        throw new Error('options.prefix must be string');
      }
    }
  }

  debug() {
    if (this.options.debug) {
      console.log.apply(console, arguments);
    }
  }

  // The actual importer function.
  handle(req, prev) {
    // If a prefix is defined, rewrite to use npm's libraries
    if (this.options.prefix) {
      req = req.replace(new RegExp("^" + this.options.prefix, "g"), "npm://");
    }

    // Convert the URL from a String to an Object
    req = url.parse(req);

    // If the protocol is registered, then run the conversion
    if (req.protocol == null) {
      return null;
    }

    this.debug('Source: ' + req.href);

    var resolver = this.protocolRegistry.get(req.protocol);

    var res = resolver(req);
    this.debug('Destination: ' + res);

    return {
      file: res
    };
  };

  setProtocolRegistry(protocolRegistry) {
    this.protocolRegistry = protocolRegistry;
  }

  getProtocolRegistry() {
    return this.protocolRegistry;
  }
}

module.exports = Importer;