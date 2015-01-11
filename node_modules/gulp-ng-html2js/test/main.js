/*global describe, it*/
"use strict";

require("mocha");
var fs = require("fs");
var path = require("path");
var es = require("event-stream");
var should = require("should");
var gutil = require("gulp-util");
var ngHtml2Js = require("../");

describe("gulp-ng-html2js", function(){
	describe("when file is provided via buffer", function(){
		it("should generate the angular module", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/example.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/example.js")
			});

			testBufferedFile(null, expectedFile, done);
		});

		it("should use options.moduleName when provided", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/exampleWithModuleName.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/exampleWithModuleName.js")
			});

			var params = {
				moduleName: "myAwesomePartials"
			};

			testBufferedFile(params, expectedFile, done);
		});

		it("should use options.moduleName (function) when provided", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/exampleWithModuleName.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/exampleWithModuleNameFunction.js")
			});

			var params = {
				moduleName: function (file) {
					String(typeof file).should.equal('object');
					return 'okiedokie';
				}
			};

			testBufferedFile(params, expectedFile, done);
		});

		it("should use options.moduleName && options.declareModule when provided", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/exampleWithModuleName.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/exampleWithModuleNameNoGenerate.js")
			});

			var params = {
				moduleName: "myAwesomePartials",
				declareModule: false
			};

			testBufferedFile(params, expectedFile, done);
		});

		it("should add options.prefix to the url in the generated file", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/exampleWithPrefix.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/exampleWithPrefix.js")
			});

			var params = {
				prefix: "/partials/"
			};

			testBufferedFile(params, expectedFile, done);
		});

		it("should subtract options.stripPrefix from the url in the generated file", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/exampleWithStripPrefix.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/exampleWithStripPrefix.js")
			});

			var params = {
				stripPrefix: "fixtures/"
			};

			testBufferedFile(params, expectedFile, done);
		});

		it("should allow a custom function to rename the generated file", function(done){
			var expectedFile = new gutil.File({
				path: "test/expected/exampleWithRename.js",
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/exampleWithRename.js")
			});

			var params = {
				rename: function () {
					return "rename.html";
				}
			};

			testBufferedFile(params, expectedFile, done);
		});

		function testBufferedFile(params, expectedFile, done){
			var srcFile = new gutil.File({
				path: "test/fixtures/example.html",
				cwd: "test/",
				base: "test",
				contents: fs.readFileSync("test/fixtures/example.html")
			});

			var stream = ngHtml2Js(params);

			stream.on("data", function(newFile){
				should.exist(newFile);
				path.extname(newFile.path).should.equal(".js");

				should.exist(newFile.contents);
				String(newFile.contents).should.equal(String(expectedFile.contents));

				done();
			});

			stream.write(srcFile);
			stream.end();
		}
	});

	it("should pass on files which are null", function(done){
		var srcFile = new gutil.File({
			path: "test/fixtures/example.html",
			cwd: "test/",
			base: "test/fixtures",
			contents: null
		});

		var stream = ngHtml2Js();

		stream.on("data", function(newFile){
			should.not.exist(newFile.contents);
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it("should error on stream", function(done){
		var srcFile = new gutil.File({
			path: "test/fixtures/example.html",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/example.html")
		});

		var stream = ngHtml2Js();

		stream.on("error", function(err){
			should.exist(err);
			done();
		});

		stream.on("data", function(newFile){
			newFile.contents.pipe(es.wait(function(err, data){
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
});
