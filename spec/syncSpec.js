var sass = require('node-sass');
var createImporter = require('..');

try {
  require('sassy-npm-importer-linked-package');
} catch(e) {
  throw new Error('Test could not find linked package. Tests are not set up correctly.');
}

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
    expect(output.indexOf('.test{background-color:#fefefe}')).toBeGreaterThanOrEqual(0);
  });

  it('can use foundation-sites with a custom prefix', function() {
    var output = renderSass('foundation-sites-custom-prefix.scss', '~/');
    expect(output.indexOf('.test{background-color:#fefefe}')).toBeGreaterThanOrEqual(0);
  });

  it('can use foundation-sites with a variable override', function() {
    var output = renderSass('foundation-sites-variable-override.scss');
    expect(output.indexOf('.test{background-color:#fff}')).toBeGreaterThanOrEqual(0);
  });

  it('can use bootstrap-sass', function() {
    var output = renderSass('bootstrap-sass.scss');
    expect(output.indexOf('.test{background-color:#fff}')).toBeGreaterThanOrEqual(0);
  });

  it('can use font-awesome', function() {
    var output = renderSass('font-awesome.scss');
    expect(output.indexOf("@font-face{font-family:'FontAwesome';")).toBeGreaterThanOrEqual(0);
  })

  it('can use a linked package', function() {
    var output = renderSass('linked-package.scss');
    expect(output.indexOf('.sassy-npm-importer-linked-package{background-color:#fff}')).toBeGreaterThanOrEqual(0);
  })
})
