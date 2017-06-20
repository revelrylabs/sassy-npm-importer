var sass = require('./helpers/sass.js');

describe('synchronous rendering', function() {
  it('can use npm with a custom prefix', function() {
    var output = sass.sync('foundation-sites-custom-prefix.scss', '~/');
    expect(output.indexOf('.test{background-color:#fefefe}')).toBeGreaterThan(0);
  });

  it('can use a linked package', function() {
    var output = sass.sync('linked-package.scss');
    expect(output.indexOf('.sassy-npm-importer-linked-package{background-color:#fff}')).toBeGreaterThanOrEqual(0);
  });
});
