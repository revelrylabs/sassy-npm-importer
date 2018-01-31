var sass = require('node-sass');
var importer = require('../../src/index.js').importer;

module.exports = {
  sync: function(file, prefix, debug) {
    return sass.renderSync({
      file: [__dirname, '..', 'support', file].join('/'),
      importer: importer({
        prefix: prefix,
        debug: debug || false,
      }),
      outputStyle: 'compressed',
    }).css.toString();
  }
}
