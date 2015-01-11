[![Build Status](https://travis-ci.org/shonny-ua/gulp-rev-outdated.svg)](https://travis-ci.org/shonny-ua/gulp-rev-outdated)
[![Dependencies](https://david-dm.org/shonny-ua/gulp-rev-outdated.svg)](https://david-dm.org/shonny-ua/gulp-rev-outdated)
[![devDependencies](https://david-dm.org/shonny-ua/gulp-rev-outdated/dev-status.svg)](https://david-dm.org/shonny-ua/gulp-rev-outdated#info=devDependencies&view=table)
[![NPM version](https://badge.fury.io/js/gulp-rev-outdated.svg)](http://badge.fury.io/js/gulp-rev-outdated)

# [gulp](https://github.com/wearefractal/gulp)-rev-outdated

[![NPM](https://nodei.co/npm/gulp-rev-outdated.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-rev-outdated/)

> Old static asset revision files filter.

## Install

```sh
$ npm install --save-dev gulp-rev-outdated
```

## Usage

We can use [gulp-rev](https://github.com/sindresorhus/gulp-rev) to cache-bust several assets. Every modification of source files caused a new revisioned asset creation. In case of using separate http://static.exsample.com/ domain for distributing static assets we have some problem with a lot of accumulated revisioned asset files. If we have several different frontends (e.q. [www-1.exsample.com, www-2.exsample.cpm, ... www-12.exsample com]) worked with different software releases, We can't remove all revisioned asset files on static.exsample.com. We need to save number of recent revisioned assets. gulp-rev-outdated filter revisioned assets and exclude parametrised quantity of recent files for removing.

Takes one parameter [ keepQuantity ] - number of saved recent files.
Default value == 2.

```js
var gulp         = require('gulp');
var revOutdated  = require('gulp-rev-outdated');
var cleaner      = require('gulp-rimraf');

gulp.task('clean', function() {
    gulp.src( ['dist/js/vendors*.js'], {read: false})
        .pipe( revOutdated(1) ) // leave 1 latest asset file
        .pipe( cleaner() );

    gulp.src( ['dist/js/bundle*.js'], {read: false})
        .pipe( revOutdated(3) ) // leave 3 recent assets
        .pipe( cleaner() );

    gulp.src( ['dist/css/*.css'], {read: false})
        .pipe( revOutdated() ) // leave 2 recent assets (default value)
        .pipe( cleaner() );

    return;
});
```

It's also possible to pass in all your asset files at once:

```js
[...]

gulp.task('clean', function() {
    gulp.src( ['dist/**/*.*'], {read: false})
        .pipe( revOutdated(1) ) // leave 1 latest asset file for every file name prefix.
        .pipe( cleaner() );

    return;
});
```

gulp.src option read false prevents gulp to read the contents of the file and makes this task a lot faster. If you need the file and it's contents after cleaning in the same stream, do not set the read option to false.

### Works with gulp-rev-outdated

- [gulp-rev](https://github.com/sindresorhus/gulp-rev)
- [gulp-rimraf](https://github.com/robrich/gulp-rimraf)
- [gulp-clean](https://github.com/peter-vilja/gulp-clean)

## License

[MIT](http://opensource.org/licenses/MIT) © [Oleksandr Ovcharenko](mailto:shonny.ua@gmail.com)
