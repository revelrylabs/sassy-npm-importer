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

  it('errors if the prefix is not a string', function() {
    expect(function() {
      var output = sass.sync('foundation-sites-custom-prefix.scss', 3);
    }).toThrow();
  });

  it('logs info when debug is set', function() {
    var spy = spyOn(console, 'log');
    var output = sass.sync('linked-package.scss', null, true);
    expect(spy).toHaveBeenCalled();
  });
});
