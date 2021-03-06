// Generated by CoffeeScript 1.6.3
(function() {
  var compiler, config, express3;

  config = require('./coffiew/config');

  compiler = require('./coffiew/compiler');

  express3 = require('./coffiew/express3');

  module.exports.config = config;

  module.exports.compile = compiler.compile;

  module.exports.compilePath = compiler.compilePath;

  module.exports.compilePathSync = compiler.compilePathSync;

  module.exports.__express = express3;

}).call(this);
