// When render is run synchronously, there is no `done` callback.
// For async we need to use the callback, and for sync just return the object.
function maybeCallback(done) {
  return function(obj) {
    return done ? done(obj) : obj;
  };
}

// options.prefix
//  - type: string
//  - default: 'npm://'
function validateAndAddDefaultsToOptions(options) {
  options.prefix = options.prefix || 'npm://';
  if(typeof(options.prefix) !== 'string') {
    throw new Error('options.prefix must be string');
  }
}

// Function that constructs the importer from options.
/** createImporter
 * Creates a new sass importer which can load from an npm module.
 * @access public
 * @param {{prefix: string}} options - the options for the importer
 * @param {string} options.prefix - the prefix to use to indicate a load from node modules. Defaults to `npm://`
 */
function createImporter(options) {
  validateAndAddDefaultsToOptions(options = options || {});
  var prefixRegex = new RegExp('^'+options.prefix);
  var debug = function() {
    if(options.debug) {
      console.log.apply(console, arguments);
    }
  };

  // The actual importer function.
  return function(url, prev, done) {
    // Use this in place of `done` so we don't have to worry about sync/async render.
    var cb = maybeCallback(done);

    // If it doesn't start with the prefix, just pass right through and do nothing.
    if(!url.match(prefixRegex)) {
      return cb(null, true);
    }

    debug('Matched ' + url);

    // Rewrite (for example)...
    //  "npm://node-module/stuff"
    //  to...
    //  "/Users/me/src/my-project/node_modules/node-module/stuff"
    var parts = url.replace(prefixRegex, '').split('/')
    var packagePath = require.resolve(parts[0] + "/package.json").replace("/package.json", "")
    parts.shift(0) // drop package name since we have base path
    var next = packagePath + "/" + parts.join("/");

    debug('Replaced with ' + next);

    return cb({file: next});
  };
}

module.exports = createImporter;
