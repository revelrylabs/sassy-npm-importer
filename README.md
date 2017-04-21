![CI Status](https://travis-ci.org/revelrylabs/sassy-npm-importer.svg?branch=master)

# sassy-npm-importer
Import SASS from npm via a customizable prefix.

## Quick Start

Get this package, sass, and then an npm package that contains sass files. In this case we'll use `foundation-sites`.

```
npm install node-sass foundation-sites
```

In practice you would probably be using something like a Gulp task here, but this is how to provide the importer directly to `node-sass`:

```
var sass = require('node-sass');
var createImporter = require('sassy-npm-importer');

var result = sass.renderSync({
  file: __dirname + '/styles.scss',
  importer: createImporter() // No options passed, uses defaults.
});
```

Create a SASS file that `@import`s from the npm package, using a prefix. The default is `npm://`.

```
@import 'npm://foundation-sites/scss/foundation';
@include foundation-everything;
```

## Options

### `debug`
More verbose output.

### `prefix`
Overrides the default `npm://` prefix to match to node modules.
```
createImporter({prefix: '~/'})
```
```
@import '~/foundation-sites/scss/foundation'
```
