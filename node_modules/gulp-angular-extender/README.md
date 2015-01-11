# [gulp](https://github.com/wearefractal/gulp)-angular-extender [![Build Status](https://secure.travis-ci.org/mariocasciaro/gulp-angular-extender.png?branch=master)](https://travis-ci.org/mariocasciaro/gulp-angular-extender) [![NPM version](https://badge.fury.io/js/gulp-angular-extender.png)](http://badge.fury.io/js/gulp-angular-extender) [![Dependency Status](https://gemnasium.com/mariocasciaro/gulp-angular-extender.png)](https://gemnasium.com/mariocasciaro/gulp-angular-extender)

> Extend AngularJS applications by injecting module dependencies at build time.

## Install

Install with [npm](https://npmjs.org/package/gulp-angular-extender).

```
npm install --save-dev gulp-angular-extender
```

## Examples

The code below, add "plugin1" and "plugin2" to the "myApp" module dependencies.

```js
var gulp = require('gulp');
var gulpAngularExtender = require('gulp-angular-extender');


gulp.task('default', function () {
    gulp.src('assets/**/*.js')
        .pipe(gulpAngularExtender({
          "myApp": [
            "plugin1",
            "plugin2"
          ]
        }))
        .pipe(gulp.dest('out/'));
});
```

Take at look at [angular-extender](https://github.com/mariocasciaro/angular-extender) to know 
what exactly this task does.

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Mario Casciaro

