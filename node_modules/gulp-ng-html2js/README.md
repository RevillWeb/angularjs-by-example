# gulp-ng-html2js [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> A plugin for [gulp](https://github.com/wearefractal/gulp) which generates AngularJS modules, which pre-load your HTML
code into the [$templateCache](http://docs.angularjs.org/api/ng.$templateCache). This way AngularJS doesn't need to
request the actual HTML files anymore.

## Usage

First, install `gulp-ng-html2js` as a development dependency:

```shell
npm install --save-dev gulp-ng-html2js
```

Then, add it to your `gulpfile.js`:

```javascript
var ngHtml2Js = require("gulp-ng-html2js");

gulp.src("./partials/*.html")
	.pipe(ngHtml2Js({
		moduleName: "MyAwesomePartials",
		prefix: "/partials"
	}))
	.pipe(gulp.dest("./dist/partials"));
```

The main reason to use this module would be optimization. By pre-loading the HTML files, you can spare requests and
loading time when the files are actually needed. When you are optimizing, you should do it properly. So, we should add
the following plugins: `gulp-minify-html`, `gulp-uglify`, and `gulp-concat`:

```javascript
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.src("./partials/*.html")
	.pipe(minifyHtml({
		empty: true,
		spare: true,
		quotes: true
	}))
	.pipe(ngHtml2Js({
		moduleName: "MyAwesomePartials",
		prefix: "/partials"
	}))
	.pipe(concat("partials.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/partials"));
```

This way you end up with 1 single, minified Javascript file, which pre-loads all the (minified) HTML templates.

If you have your modules sorted into directories that match the module name, you could do something like this:

```
// This picks up files like this:
//   partials/date-picker/year.html (as well as month.html, day.html)
//   partials/expanded-combo-box/combobox.html
//   partials/forms/feedback.html (as well as survey.html, contact.html)
// Returns modules like this:
//   datePicker, expandedComboBox, forms
gulp.src("./partials/**/*.html")
    .pipe(ngHtml2Js({
		moduleName: function (file) {
			var path = file.split('/'),
			    folder = path[path.length - 2];
			return folder.replace(/-[a-z]/g, function (match) {
				return match.substr(1).toUpperCase();
			});
		}
	}))
	.pipe(concat("partials.min.js"))
	.pipe(gulp.dest('./dist/partials'));
}
```

## API

### ngHtml2Js(options)

#### options.moduleName
Type: `String` or `Function`

The name of the generated AngularJS module. Uses the file url if omitted.

When this is a function, the returned value will be the module name.  The function will be passed the vinyl file object so the module name can be determined from the path, content, last access time or any other property.  Returning `undefined` will fall back to the file url.

#### options.declareModule
Type: `Boolean`

Whether to attempt to declare a new module (used with options.moduleName).  True if omitted.

Set this to false if options.moduleName is already declared.

#### options.prefix
Type: `String`

The prefix which should be prepended to the file path to generate the file url.

#### options.stripPrefix
Type: `String`

The prefix which should be subtracted from the file path to generate the file url.

#### options.rename
Type: `Function`

A function that allows the generate file url to be manipulated. For example:

```
function (url) {
  return url.replace('.tpl.html', '.html');
}
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-ng-html2js
[npm-image]: https://badge.fury.io/js/gulp-ng-html2js.png

[travis-url]: http://travis-ci.org/marklagendijk/gulp-ng-html2js
[travis-image]: https://secure.travis-ci.org/marklagendijk/gulp-ng-html2js.png?branch=master

[depstat-url]: https://david-dm.org/marklagendijk/gulp-ng-html2js
[depstat-image]: https://david-dm.org/marklagendijk/gulp-ng-html2js.png
