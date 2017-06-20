var Importer = require('./Importer.js');

module.exports = function(options) {
  options = options || {};

  var importer = new Importer(options);

  return function() {
    return importer.handle.apply(importer, arguments);
  };
};
