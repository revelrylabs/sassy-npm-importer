var sass = require('node-sass');
var importer = require('../../src/index.js');

module.exports = {
  sync: function(file, prefix) {
    return sass.renderSync({
      file: [__dirname, '..', 'support', file].join('/'),
      importer: importer({
        prefix: prefix,
        debug: false
      }),
      outputStyle: 'compressed',
    }).css.toString();
  }
}
