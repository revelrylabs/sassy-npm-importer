var exec = require('child_process').exec;
describe('command line interface', function() {
  it('can use sassy-npm-importer', function(done) {
    var output = exec(
      "node-sass --importer . --output-style compressed spec/support/reset-main.scss",
      function (error, stdout, stderr) {
        expect(error).toBe(null, stderr);
        expect(stdout.indexOf("box-sizing:border-box")).toBeGreaterThan(0);
        done();
      }
    );
  });
});
