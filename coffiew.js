// Generated by CoffeeScript 1.6.3
(function() {
  var requirejs;

  requirejs = require('./modules/requirejs');

  requirejs(['./coffiew/compiler', './coffiew/express3'], function(compiler, express3) {
    return {
      compile: compiler.compile,
      compilePath: compiler.compilePath,
      __express: express3
    };
  });

}).call(this);