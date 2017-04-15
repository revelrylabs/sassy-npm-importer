var Importer = require('./Importer.js');

module.exports = function(options) {
  options = options || {
    prefix: null,
    debug: false
  };

  return function() {
    var importer = new Importer(options);
    return importer.handle.apply(importer, arguments);
  };
};
