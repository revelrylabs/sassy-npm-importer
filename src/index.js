var Importer = require('./Importer.js');

module.exports = function(url, prev, done) {
  var importer = new Importer({});
  done(importer.handle.apply(importer, arguments));
};

module.exports.importer = function (options) {
  var importer = new Importer(options || {});

  return function() {
    return importer.handle.apply(importer, arguments);
  };
}
