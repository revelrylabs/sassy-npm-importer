var sass = require('node-sass');
var createImporter = require('../index.js');

function renderSass(file, prefix) {
  return sass.renderSync({
    file: [__dirname, 'support', file].join('/'),
    importer: createImporter({prefix: prefix, debug: true}),
    outputStyle: 'compressed',
  }).css.toString();
}

describe('synchronous rendering', function() {

  it('can use foundation-sites', function() {
    var output = renderSass('foundation-sites.scss');
    expect(output.indexOf('.test{background-color:#fefefe}')).toBeGreaterThan(0);
  });

  it('can use foundation-sites with a custom prefix', function() {
    var output = renderSass('foundation-sites-custom-prefix.scss', '~/');
    expect(output.indexOf('.test{background-color:#fefefe}')).toBeGreaterThan(0);
  });

  it('can use foundation-sites with a variable override', function() {
    var output = renderSass('foundation-sites-variable-override.scss');
    expect(output.indexOf('.test{background-color:#fff}')).toBeGreaterThan(0);
  });

  it('can use bootstrap-sass', function() {
    var output = renderSass('bootstrap-sass.scss');
    expect(output.indexOf('.test{background-color:#fff}')).toBeGreaterThan(0);
  });

  it('can use font-awesome', function() {
    var output = renderSass('font-awesome.scss');
    expect(output.indexOf("@font-face{font-family:'FontAwesome';")).toBeGreaterThan(0);
  })
})
