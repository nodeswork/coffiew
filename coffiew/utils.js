// Generated by CoffeeScript 1.6.3
(function() {
  var config, fs, path, utils, _,
    __slice = [].slice;

  _ = require('underscore');

  config = require('./config');

  fs = require('fs');

  path = require('path');

  module.exports = utils = {
    mergeElements: function() {
      var arg, args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _.union(_.flatten((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          _results.push(arg.split(' '));
        }
        return _results;
      })()));
    },
    getFullPath: function(templatePath) {
      if (path.extname(templatePath) !== config.env.extension) {
        templatePath += config.env.extension;
      }
      if (templatePath[0] !== '/') {
        return path.join(config.env.prefix, templatePath);
      } else {
        return templatePath;
      }
    },
    loadTemplateFromPath: function(path, cb) {
      var requirejs;
      path = utils.getFullPath(path);
      switch (false) {
        case !config.env.isNode:
          return fs.readFile(path, 'utf-8', cb);
        case !config.env.isBrowser:
          requirejs = require('requirejs');
          return requirejs(["text!" + path], function(templateContent) {
            return cb(null, templateContent);
          });
        default:
          return cb('unknown working environment.');
      }
    },
    loadTemplateFromPathSync: function(path) {
      path = utils.getFullPath(path);
      if (config.env.isNode) {
        return fs.readFileSync(path, 'utf-8');
      }
      throw new Error("Current running environment doesn't support sync mode.");
    }
  };

}).call(this);
