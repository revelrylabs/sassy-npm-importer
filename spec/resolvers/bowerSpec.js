var sass = require('../helpers/sass.js');

describe('bower resolver', function() {
  it('can use bower', function() {
    var output = sass.sync('bower-reset-scss.scss');
    expect(output.indexOf("body")).toBeGreaterThan(0);
  });

  it('can use bower package main', function() {
    var output = sass.sync('bower-package.scss');
    expect(output.indexOf("body")).toBeGreaterThan(0);
  });
});
