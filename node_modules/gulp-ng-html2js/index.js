var util = require("util");
var gutil = require("gulp-util");
var map = require("map-stream");

var TEMPLATE = "angular.module(\'%s\', []).run([\'$templateCache\', function($templateCache) {\n" +
	"  $templateCache.put(\'%s\',\n    \'%s\');\n" +
	"}]);\n";

var TEMPLATE_DECLARED_MODULE = "angular.module(\'%s\').run([\'$templateCache\', function($templateCache) {\n" +
	"  $templateCache.put(\'%s\',\n    \'%s\');\n" +
	"}]);\n";

var SINGLE_MODULE_TPL = "(function(module) {\n" +
	"try {\n" +
	"  module = angular.module(\'%s\');\n" +
	"} catch (e) {\n" +
	"  module = angular.module(\'%s\', []);\n" +
	"}\n" +
	"module.run([\'$templateCache\', function($templateCache) {\n" +
	"  $templateCache.put(\'%s\',\n    \'%s\');\n" +
	"}]);\n" +
	"})();\n";

/**
 * Converts HTML files into Javascript files which contain an AngularJS module which automatically pre-loads the HTML
 * file into the [$templateCache](http://docs.angularjs.org/api/ng.$templateCache). This way AngularJS doens't need to
 * request the actual HTML file anymore.
 * @param [options] - The plugin options
 * @param [options.moduleName] - The name of the module which will be generated. When omitted the fileUrl will be used.
 * @param [options.declareModule] - Whether to try to create the module. Default true, if false it will not create options.moduleName.
 * @param [options.stripPrefix] - The prefix which should be stripped from the file path
 * @param [options.prefix] - The prefix which should be added to the start of the url
 * @returns {stream}
 */
module.exports = function(options){
	"use strict";

	function ngHtml2Js(file, callback){
		if(file.isStream()){
			return callback(new Error("gulp-ng-html2js: Streaming not supported"));
		}

		if(file.isBuffer()){
			var filePath = getFileUrl(file, options);
			file.contents = new Buffer(generateModuleDeclaration(filePath, file, options));
			file.path = gutil.replaceExtension(file.path, ".js");
		}

		return callback(null, file);
	}

	/**
	 * Generates the Javascript code containing the AngularJS module which puts the HTML file into the $templateCache.
	 * @param fileUrl - The url with which the HTML will be registered in the $templateCache.
	 * @param file - The vinyl file object.
	 * @param [options] - The plugin options
	 * @param [options.moduleName] - The name of the module which will be generated. When omitted the fileUrl will be used.
	 * @returns {string} - The generated Javascript code.
	 */
	function generateModuleDeclaration(fileUrl, file, options){
		var escapedContent = escapeContent(String(file.contents)), moduleName;
		if(options && options.moduleName){
			moduleName = options.moduleName;
			if (typeof moduleName === 'function') {
				moduleName = moduleName(file);
			}
		}
		if (moduleName) {
			if (options.declareModule === false) {
				return util.format(TEMPLATE_DECLARED_MODULE, moduleName, fileUrl, escapedContent);
			} else {
				return util.format(SINGLE_MODULE_TPL, moduleName, moduleName, fileUrl, escapedContent);
			}
		}
		else{
			return util.format(TEMPLATE, fileUrl, fileUrl, escapedContent);
		}
	}

	/**
	 * Generates the url of a file.
	 * @param file - The file for which a url should be generated
	 * @param [options] - The plugin options
	 * @param [options.stripPrefix] - The prefix which should be stripped from the file path
	 * @param [options.prefix] - The prefix which should be added to the start of the url
	 * @param [options.rename] - A function that takes in the generated url and returns the desired manipulation.
	 * @returns {string}
	 */
	function getFileUrl(file, options){
		// Start with the relative file path
		var url = file.relative;

		// Replace '\' with '/' (Windows)
		url = url.replace(/\\/g, "/");

		// Remove the stripPrefix
		if(options && options.stripPrefix && url.indexOf(options.stripPrefix) === 0){
			url = url.replace(options.stripPrefix, "");
		}
		// Add the prefix
		if(options && options.prefix){
			url = options.prefix + url;
		}

		// Rename the url
		if(options && options.rename){
			url = options.rename(url);
		}

		return url;
	}

	/**
	 * Escapes the content of an string so it can be used in a Javascript string declaration
	 * @param {string} content
	 * @returns {string}
	 */
	function escapeContent(content){
		return content.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r?\n/g, "\\n' +\n    '");
	}

	return map(ngHtml2Js);
};
