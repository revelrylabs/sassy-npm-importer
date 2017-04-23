var sass = require('../helpers/sass.js');

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
});
