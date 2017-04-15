![CI Status](https://travis-ci.org/revelrylabs/sassy-npm-importer.svg?branch=master)

# sassy-npm-importer

Import SASS from package managers using customizable protocols. Comes with
support for node package manager (via `npm://`) and bower (via `bower://`).

```
@import "npm://reset-scss/";
@import "bower://reset-scss/";
```

&nbsp;

## Installation

```
npm install --save sassy-npm-importer
npm install --save bower                    # if you want to use bower
```

In practice, you would probably be using a task runner (like Gulp), this is an
example of how to provide the importer directly to `node-sass`:

```
var sass = require('node-sass');
var importer = require('sassy-npm-importer');

var result = sass.renderSync({
  file: __dirname + '/styles.scss',
  importer: importer() // No options passed, uses defaults.
});
```

&nbsp;

## Quick Start

Once you've installed the package, you can follow these instructions to test
the importer. This example shows you how to import the
`foundation-sites` package.

```
npm install --save node-sass                # for this example
npm install --save foundation-sites         # example package
bower install --save foundation-sites       # example package
```

This is an example of how to provide the importer directly to `node-sass`:

### node: `index.js`

```
var sass = require('node-sass');
var importer = require('sassy-npm-importer');

var result = sass.renderSync({
  file: __dirname + '/styles.scss',
  importer: importer() // No options passed, uses defaults.
});
```

Create a SASS file that `@import`s from a package manager.

### npm: `styles.scss`
```
@import 'npm://foundation-sites/scss/foundation';
@include foundation-everything;
```

### bower: `styles.scss`
```
@import 'bower://foundation-sites/scss/foundation';
@include foundation-everything;
```

&nbsp;

## Importing packages

Some node and bower packages contain a `main` property which points to a SASS
file. Instead of having to enter the long path to a file, you can simply use
the package name and this main file is included.

For example, if a dependency had a `package.json` file which was similar to:

```
{
  "name": "my-sass-dependency",
  "main": "reset.scss"
}
```

Then you have the option of how to import the dependency, all are valid:

```
# This long form with the extension
@import "npm://my-sass-dependency/reset.scss";

# This long form without the extension
# Matches one of: _reset.scss, reset.scss, _reset.css and reset.css
@import "npm://my-sass-dependency/reset";

# The short form, will include whatever `main` refers to
# In this example: reset.scss
@import "npm://my-sass-dependency/";

# The final slash is optional
@import "npm://my-sass-dependency";
```

&nbsp;

## Options

### options.debug

More verbose output.

* Since: 1.0.0

&nbsp;

### options.prefix

Attaches a prefix that rewrites to `npm://` to node modules.

* Since: 1.0.0
* Deprecated: 2.1.0

```
importer({prefix: '~/'})
```

```
@import '~/foundation-sites/scss/foundation'
# is now the same as
@import 'npm://foundation-sites/scss/foundation'
```

This option is deprecated; its functionality is provided for backwards
compatibility and has been succeeded by the `ProtocolRegistry`. It should be
removed and should not be relied upon.

&nbsp;

## Protocol Registry

Allows for custom protocols to be registered so that different package managers
can integrate with the library.

* Since: 2.1.0
* Applies globally

Usage: `sassImporter.protocolRegistry.add(String protocol, Function resolver(Object req):String)`

* `String protocol`: the name of protocol being attached, should end with a colon (`:`)
* `Function resolver(Object req):String`: the function that performs the conversion
  * Argument `req:Object` the result of passing the import requested file to [url.parse()](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost)
  * Returns: `String` the location of the file to be imported

Example usage:

```
var path = require('path');
var sassImporter = require('sassy-npm-importer');

sassImporter.protocolRegistry.add('project:', function (req) {
  return req.hostname;
});
```

```
@import "project://filename";
```

&nbsp;
