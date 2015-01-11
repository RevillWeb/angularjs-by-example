# Synopsis

Extend AngularJS applications by injecting module dependencies  at build time (using static code transformations).

For example transforms this:
```javascript
angular.module('moduleName', ['dependency']);
```

into that

```javascript
angular.module('moduleName', ['dependency', 'additionalDependency']);
```

[![NPM](https://nodei.co/npm/angular-extender.png?downloads=true)](https://nodei.co/npm/angular-extender/)

[![Build Status](https://travis-ci.org/mariocasciaro/angular-extender.png)](https://travis-ci.org/mariocasciaro/angular-extender)
[![Coverage Status](https://coveralls.io/repos/mariocasciaro/angular-extender/badge.png)](https://coveralls.io/r/mariocasciaro/angular-extender)

## Motivation

Nowadays having a project using [Grunt](http://gruntjs.com/) (or any other similar tool) for workflow automation and asset management is not uncommon. So the idea with this small library is to provide a way to implement a simple **plugin system** for AngularJS applications using only static code transformations. This has two main advantages (compared to extending the module with dynamic tricks):
* Keeps the code clean from boilerplate
* The modules can be still declared in any order.

The main use case for such a system is when you have an AngularJS based application and you want to **allow third party modules (plugins) to exend you core app** without hardcoding those new dependencies. 

## Usage

```javascript
var angularExtend = require('angular-extend');

var src = "angular.module('moduleName', ['aModule']);";
var res = angularExtend(src, {moduleName: ['aPlugin']});
/*
res.out will be:

angular.module('moduleName', ['aModule', "aPlugin"]);

res.changed is a boolean and will tell if any extension was applied at all.
*/
```

## Grunt plugin

A grunt plugin using this library will be soon available at https://github.com/mariocasciaro/grunt-angular-extender

## Limitations

The transformation will work only if you follow the convention of delaring modules like
```
angular.module(<string>, [<strings>]);
```
Using variables or functions to define the module name, will fail.

## Contributors

* [Mario Casciaro](https://github.com/mariocasciaro) - Creator/Maitainer - Twitter [@mariocasciaro](https://twitter.com/mariocasciaro)

Thanks to [olov](https://github.com/olov) and his project [ng-annotate](https://github.com/olov/ng-annotate) for the 
inspiration he gave me to build this little tool.

-----

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mariocasciaro/angular-extender/trend.png)](https://bitdeli.com/free "Bitdeli Badge")