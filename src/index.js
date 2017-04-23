var Importer = require('./Importer.js');
var ProtocolRegistry = require('./ProtocolRegistry.js');

module.exports = function(options) {
  options = options || {};

  var importer = new Importer(options);
  importer.setProtocolRegistry(protocolRegistry);

  return function() {
    return importer.handle.apply(importer, arguments);
  };
};

var protocolRegistry = new ProtocolRegistry();
protocolRegistry.add('npm:', require('./resolvers/npm.js'));
protocolRegistry.add('bower:', require('./resolvers/bower.js'));
module.exports.protocolRegistry = protocolRegistry;
