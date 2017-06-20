var sass = require('./helpers/sass.js');
var createImporter = require('../index.js');

try {
  require('sassy-npm-importer-linked-package');
} catch(e) {
  throw new Error('Test could not find linked package. Tests are not set up correctly.');
}

describe('npm resolver', function() {
  it('can use foundation-sites', function() {
    var output = sass.sync('foundation-sites.scss');
    expect(output.indexOf('.test{background-color:#fefefe}')).toBeGreaterThan(0);
  });

  it('can use foundation-sites with a variable override', function() {
    var output = sass.sync('foundation-sites-variable-override.scss');
    expect(output.indexOf('.test{background-color:#fff}')).toBeGreaterThan(0);
  });

  it('can use bootstrap-sass', function() {
    var output = sass.sync('bootstrap-sass.scss');
    expect(output.indexOf('.test{background-color:#fff}')).toBeGreaterThan(0);
  });

  it('can use font-awesome', function() {
    var output = sass.sync('font-awesome.scss');
    expect(output.indexOf("@font-face{font-family:'FontAwesome';")).toBeGreaterThan(0);
  });

  it('can use main property in a package', function() {
    var output = sass.sync('reset-main.scss');
    expect(output.indexOf("box-sizing:border-box")).toBeGreaterThan(0);
  });
});
