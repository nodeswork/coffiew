// Generated by CoffeeScript 1.6.3
(function() {
  var config, env;

  env = {
    isBrowser: typeof window !== "undefined" && window !== null,
    isNode: typeof process !== "undefined" && process !== null,
    onError: function(path, options, err) {
      console.err("coffiew render failed for " + path + " with options[" + options + "]");
      return console.err(err.stack);
    },
    extension: 'coffiew',
    prefix: ''
  };

  module.exports = config = {
    env: env,
    extend: function(configs) {
      return _.extend(env, configs);
    }
  };

}).call(this);
