angular.module('rename.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('rename.html',
    '<!doctype html>\n' +
    '<html>\n' +
    '	<head>\n' +
    '		<title>Example</title>\n' +
    '\n' +
    '		<meta charset="utf-8" />\n' +
    '		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n' +
    '		<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
    '		<style type="text/css">\n' +
    '			body {\n' +
    '				margin: 0;\n' +
    '				padding: 0;\n' +
    '				font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n' +
    '				background-color: #f0f0f2;\n' +
    '\n' +
    '			}\n' +
    '		</style>\n' +
    '		<script type="text/javascript">\n' +
    '			function someInlineScript(){\n' +
    '				alert("This is some \'inline script")\n' +
    '			}\n' +
    '		</script>\n' +
    '	</head>\n' +
    '	<body>\n' +
    '		<ul>\n' +
    '			<li ng-repeat="item in items">{{ item.name }}</li>\n' +
    '		</ul>\n' +
    '		<ul>\n' +
    '			<li ng-repeat=\'thingy in thingies\'>{{ thingy.name }}</li>\n' +
    '		</ul>\n' +
    '	</body>\n' +
    '</html>\n' +
    '');
}]);
