var expect = require('chai').expect,
  through = require('through2'),
  fs = require('fs'),
  gutil = require('gulp-util'),
  gulpAngularExtender = require('../');



describe('gulp-angular-extender', function() {
  it('should add some module dependencies to a set of module declarations', function(done) {
    var startStream = gulpAngularExtender({
      mod1: ['test1', 'test2'],
      mod2: ['test3']
    });
    
    startStream.pipe(through.obj(function(f,e,c) {
      expect(String(f.contents)).to.be.equal(fs.readFileSync('test/expected/test1.js', 'utf8'));
      done();
    }));
    
    startStream.write(new gutil.File({
      path: 'test/expected/test1',
      contents: fs.readFileSync('test/fixtures/test1.js')
    }));
    startStream.end();
  });
});
