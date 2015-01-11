var through = require('through2'),
  gutil = require('gulp-util'),
  angularExtender = require('angular-extender');


module.exports = function gulpAngularExtender(modules) {
  modules = modules || {};
  
  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-angular-extender', 'Streaming not supported'));
      return cb();
    }
    
    if (file.isNull()) {
      return cb(null, file);  // Do nothing if no contents
    }
    
    var transformed = angularExtender(file.contents.toString('utf8'), modules);
    if(transformed.changed) {
      file.contents = new Buffer(transformed.out);
    }
    cb(null, file);
  });
};
