![CI Status](https://travis-ci.org/revelrylabs/sassy-npm-importer.svg?branch=master)

# sassy-npm-importer

Import SASS from npm via a customizable prefix.

## Installation

Get this package, sass, and then an npm package that contains sass files. In this case we'll use `foundation-sites`.

```
npm install node-sass foundation-sites
```

## Usage

In practice you would probably be using something like a Gulp task here, but this is how to provide the importer directly to `node-sass`:

```js
var sass = require('node-sass');
var createImporter = require('sassy-npm-importer');

var result = sass.renderSync({
  file: __dirname + '/styles.scss',
  importer: createImporter() // No options passed, uses defaults.
});
```

Create a SASS file that `@import`s from the npm package, using a prefix. The default is `npm://`.

```scss
@import 'npm://foundation-sites/scss/foundation';
@include foundation-everything;
```

## Configuration Options

### `debug`

More verbose output.

### `prefix`

Overrides the default `npm://` prefix to match to node modules.

```js
createImporter({prefix: '~/'})
```

```scss
@import '~/foundation-sites/scss/foundation'
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/revelrylabs/sassy-npm-importer. Check out [CONTRIBUTING.md](https://github.com/revelrylabs/sassy-npm-importer/blob/master/CONTRIBUTING.md) for more info.

Everyone is welcome to participate in the project. We expect contributors to
adhere the Contributor Covenant Code of Conduct (see [CODE_OF_CONDUCT.md](https://github.com/revelrylabs/sassy-npm-importer/blob/master/CODE_OF_CONDUCT.md)).
