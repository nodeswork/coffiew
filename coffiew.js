// Generated by CoffeeScript 1.6.3
(function() {
  var Renderer, camelCaseKey, changeCase, coffeescript, coffiew, constants, contentFor, defineCommand, doctype, env, extend, originKey, partial, utils, yieldContent, _, __helper, _ref,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('underscore');

  changeCase = require('change-case');

  coffeescript = require('coffee-script');

  coffiew = {};

  coffiew.env = env = {
    isBrowser: typeof window !== "undefined" && window !== null,
    isNode: typeof process !== "undefined" && process !== null,
    onError: function(path, options, err) {
      console.error("coffiew renders failed for " + path + " with options[" + options + "]");
      return console.error(err.stack);
    },
    extension: '.coffiew',
    prefix: ''
  };

  coffiew.extend = function(configs) {
    return _.extend(coffiew.env, configs);
  };

  coffiew.utils = utils = {
    extname: function(path) {
      var parts;
      parts = path.split('.');
      if (parts.length != null) {
        return "." + parts[parts.length - 1];
      } else {
        return '';
      }
    },
    join: function() {
      var args, path1, path2;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      switch (args.length) {
        case 0:
          return '';
        case 1:
          return args[0];
        default:
          path1 = utils.join.apply(null, args.slice(0, args.length - 1));
          if (path1[path1.length - 1] !== '/') {
            path1 += '/';
          }
          path2 = args[args.length - 1];
          if (path2[0] !== '/') {
            return path1 + path2;
          } else {
            return path2;
          }
      }
    },
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
      if (utils.extname(templatePath) !== env.extension) {
        templatePath += env.extension;
      }
      return utils.join(env.prefix, templatePath);
    },
    loadTemplateFromPath: function(path, cb) {
      path = utils.getFullPath(path);
      switch (false) {
        case !env.isNode:
          return require('fs').readFile(path, 'utf-8', cb);
        case !env.isBrowser:
          return requirejs(["text!" + path], function(templateContent) {
            return cb(null, templateContent);
          });
        default:
          return cb('unknown working environment.');
      }
    },
    loadTemplateFromPathSync: function(path) {
      path = utils.getFullPath(path);
      if (env.isNode) {
        return require('fs').readFileSync(path, 'utf-8');
      }
      throw new Error("Current running environment doesn't support sync mode, try to call ensureLoadTemplate(s) on " + path + " first");
    },
    passError: function(cb, func) {
      return function() {
        var args, err;
        err = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (err != null) {
          return cb(err);
        } else {
          return func.apply(this, args);
        }
      };
    }
  };

  coffiew.constants = constants = {
    doctypes: {
      "default": '<!DOCTYPE html>',
      5: '<!DOCTYPE html>',
      xml: '<?xml version="1.0" encoding="utf-8" ?>',
      transitional: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
      strict: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
      frameset: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
      1.1: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
      basic: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',
      mobile: '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">',
      ce: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "ce-html-1.0-transitional.dtd">'
    },
    elements: {
      regular: 'a abbr address article aside audio b bdi bdo blockquote body button\
 canvas caption cite code colgroup datalist dd del details dfn div dl dt em\
 fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup\
 html i iframe ins kbd label legend li main map mark menu meter nav noscript object\
 ol optgroup option output p pre progress q rp rt ruby s samp script section\
 select small span strong style sub summary sup table tbody td textarea tfoot\
 th thead time title tr u ul video',
      svg: 'a altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion\
 animateTransform circle clipPath color-profile cursor defs desc ellipse\
 feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix\
 feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB\
 feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology\
 feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence\
 filter font font-face font-face-format font-face-name font-face-src\
 font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient\
 marker mask metadata missing-glyph mpath path pattern polygon polyline\
 radialGradient rect script set stop style svg symbol text textPath\
 title tref tspan use view vkern',
      "void": 'area base br col command embed hr img input keygen link meta param source track wbr',
      xml: 'urlset url loc lastmod changefreq priority',
      obsolete: 'applet acronym bgsound dir frameset noframes isindex listing\
 nextid noembed plaintext rb strike xmp big blink center font marquee multicol\
 nobr spacer tt',
      obsolete_void: 'basefont frame'
    }
  };

  __helper = {
    entityMap: {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    },
    escapeHTML: function(content) {
      return content != null ? content.toString().replace(/[&<>"'\/]/g, function(s) {
        return __helper.entityMap[s];
      }) : void 0;
    },
    closedTags: constants.elements["void"].split(' '),
    isSelfCloseTag: function(tagName) {
      return __indexOf.call(__helper.closedTags, tagName) >= 0;
    },
    __lastRenderer: null,
    seekRenderer: function(args) {
      var caller, _ref;
      caller = args.callee;
      while (!((caller == null) || (caller.renderer != null))) {
        caller = caller.caller;
      }
      return __helper.__lastRenderer = (_ref = caller != null ? caller.renderer : void 0) != null ? _ref : __helper.__lastRenderer;
    },
    renderTag: function() {
      var arg, args, attrs, contents, i, inline, renderer, tagName, _i, _len;
      tagName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      renderer = __helper.seekRenderer(arguments);
      inline = contents = null;
      attrs = {
        classes: []
      };
      for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
        arg = args[i];
        switch (false) {
          case !_.isFunction(arg):
            contents = arg;
            break;
          case !_.isObject(arg):
            _.extend(attrs, arg);
            break;
          case !(_.isString(arg) && args.length === 1):
            contents = arg;
            break;
          case !(_.isString(arg) && i === 0):
            inline = arg.replace(/(#|\.)([\w\d-]+)/gi, function(match, type, val) {
              if (type === '#') {
                if (attrs.id == null) {
                  attrs.id = val;
                }
              } else {
                attrs.classes.push(val);
              }
              return '';
            });
            break;
          default:
            contents = arg;
        }
      }
      return renderer._renderTag(tagName, attrs, inline, contents);
    },
    allTags: utils.mergeElements.apply(null, _.values(constants.elements)),
    revTagMap: _.memoize(function() {
      var tag;
      return _.object((function() {
        var _i, _len, _ref, _results;
        _ref = __helper.allTags;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          _results.push([changeCase.camelCase(tag), tag]);
        }
        return _results;
      })());
    }),
    compile: function(templateContent, options) {
      var tpl;
      if (options == null) {
        options = {};
      }
      tpl = new Renderer(coffeescript.compile(templateContent, {
        bare: true
      }), options);
      return function(data, sections) {
        if (data == null) {
          data = {};
        }
        if (sections == null) {
          sections = {};
        }
        return tpl.render(data, sections);
      };
    },
    compilePath: function() {
      var cb, options, path, _i;
      path = arguments[0], options = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), cb = arguments[_i++];
      options = options[0] || {};
      if (env.isBrowser) {
        if (options.cache == null) {
          options.cache = true;
        }
      }
      if (options.cache && (__helper.cachedTemplates[path] != null)) {
        return cb(null, __helper.cachedTemplates[path]);
      }
      return utils.loadTemplateFromPath(path, utils.passError(cb, function(templateContent) {
        var deps, tpl;
        tpl = __helper.compile(templateContent, _.extend(options, {
          templatePath: path
        }));
        if (options.cache) {
          __helper.cachedTemplates[path] = tpl;
        }
        if (options.chain) {
          deps = [];
          templateContent.replace(/(extend|partial)\s+'([\w\d\/_-]+)'/g, function(match, op, fp) {
            return deps.push(op === 'extend' ? fp : __helper.partialPath(fp));
          });
          return __helper.ensureLoadTemplates(deps, function() {
            return cb(null, tpl);
          });
        } else {
          return cb(null, tpl);
        }
      }));
    },
    compilePathSync: function(path, options) {
      var templateContent, tpl;
      if (options == null) {
        options = {};
      }
      if (env.isBrowser) {
        if (options.cache == null) {
          options.cache = true;
        }
      }
      if (options.cache && (__helper.cachedTemplates[path] != null)) {
        return __helper.cachedTemplates[path];
      }
      templateContent = utils.loadTemplateFromPathSync(path);
      tpl = __helper.compile(templateContent, _.extend(options, {
        templatePath: path
      }));
      if (options.cache) {
        __helper.cachedTemplates[path] = tpl;
      }
      return tpl;
    },
    ensureLoadTemplates: function(templatePaths, cb) {
      var afterCb, err, templatePath, templates, _i, _len, _results;
      if (!templatePaths.length) {
        return cb();
      }
      afterCb = _.after(templatePaths.length, cb);
      templates = [];
      err = null;
      _results = [];
      for (_i = 0, _len = templatePaths.length; _i < _len; _i++) {
        templatePath = templatePaths[_i];
        _results.push(__helper.ensureLoadTemplate(templatePath, function(e, tpl) {
          templates.push(tpl);
          return afterCb(err != null ? err : err = e, templates);
        }));
      }
      return _results;
    },
    ensureLoadTemplate: function(templatePath, cb) {
      return __helper.compilePath(templatePath, {
        cache: true,
        chain: true
      }, utils.passError(cb, function(tpl) {
        return cb(tpl);
      }));
    },
    render: function(templatePath, data) {
      return __helper.compilePathSync(templatePath, {
        cache: true
      })(data);
    },
    cachedTemplates: {},
    partialPath: function(path) {
      var parts;
      parts = path.split('/');
      parts[parts.length - 1] = '_' + parts[parts.length - 1];
      return parts.join('/');
    }
  };

  defineCommand = "var " + (_.keys(__helper.revTagMap()).join(',')) + ";";

  if (env.isNode) {
    require('vm').runInThisContext(defineCommand);
  } else {
    eval(defineCommand);
  }

  _ref = __helper.revTagMap();
  for (camelCaseKey in _ref) {
    originKey = _ref[camelCaseKey];
    eval("" + camelCaseKey + " = _.partial(__helper.renderTag, '" + originKey + "');");
  }

  doctype = function(type) {
    if (type == null) {
      type = 'default';
    }
    return __helper.seekRenderer(arguments)._doctype(type);
  };

  partial = function(path, data) {
    if (data == null) {
      data = {};
    }
    return __helper.seekRenderer(arguments)._partial(path, data);
  };

  extend = function(path, data) {
    if (data == null) {
      data = {};
    }
    return __helper.seekRenderer(arguments)._extend(path, data);
  };

  yieldContent = function(name, contents) {
    return __helper.seekRenderer(arguments)._yieldContent(name, contents);
  };

  contentFor = function(name, contents) {
    return __helper.seekRenderer(arguments)._contentFor(name, contents);
  };

  Renderer = (function() {
    Renderer._renderId = 0;

    function Renderer(template, options) {
      var k, v;
      this.options = options;
      this.locals = _.extend({}, this.options.locals);
      if (_.keys(this.locals).length) {
        defineCommand = "var " + (_.keys(this.options.locals).join(',')) + ";";
        if (env.isNode) {
          require('vm').runInThisContext(defineCommand);
        } else {
          eval(defineCommand);
        }
        for (k in options) {
          v = options[k];
          eval("" + k + " = v;");
        }
      }
      eval("this.template = function() {" + template + "}");
      this.dataStack = [];
      this.sectionStack = [];
      this.extendStack = [];
    }

    Renderer.prototype.render = function(data, sections) {
      var htmlResult, previousRenderer, renderId;
      this.sections = sections != null ? sections : {};
      this.dataStack.push(this._patchData(data));
      this.sections[renderId = this._nextRenderId()] = [];
      this.sectionStack.push(renderId);
      this.extendStack.push([]);
      previousRenderer = this.template.renderer;
      this.template.renderer = this;
      this.template.apply(this._currentData(), []);
      htmlResult = this._generateResult(renderId);
      this.template.renderer = previousRenderer;
      delete this.sections[renderId];
      this.dataStack.pop();
      this.sectionStack.pop();
      this.extendStack.pop();
      return htmlResult;
    };

    Renderer.prototype._renderTag = function(tagName, attrs, inline, contents) {
      if (tagName === 'text') {
        return this._renderContent(contents, attrs.safe);
      }
      this._text("<", true);
      this._text("" + tagName);
      this._attrs(attrs);
      if (inline != null ? inline.length : void 0) {
        this._text(" " + inline, attrs.safe);
      }
      if (__helper.isSelfCloseTag(tagName)) {
        if (contents != null) {
          contents = this._renderContent(contents, attrs.safe);
          if (contents != null) {
            this._attrs({
              value: contents
            });
          }
        }
        return this._text('>', true);
      } else {
        this._text('>', true);
        this._renderContent(contents, attrs.safe);
        this._text('</', true);
        this._text(tagName);
        return this._text('>', true);
      }
    };

    Renderer.prototype._renderContent = function(contents, safe) {
      var previousRenderer, result;
      if (safe == null) {
        safe = false;
      }
      switch (false) {
        case !_.isFunction(contents):
          previousRenderer = contents.renderer;
          contents.renderer = this;
          result = contents.call(this._currentData());
          contents.renderer = previousRenderer;
          return result;
        default:
          this._text(contents, safe);
          return contents;
      }
    };

    Renderer.prototype._attrs = function(attrs, safe) {
      var attr, attrReady, items, k, v, val, _results,
        _this = this;
      if (safe == null) {
        safe = false;
      }
      attrReady = function(key, val) {
        _this._text(" " + key + "=", safe);
        _this._text('"', true);
        _this._text(val, safe);
        return _this._text('"', true);
      };
      _results = [];
      for (attr in attrs) {
        val = attrs[attr];
        switch (false) {
          case val !== true:
            _results.push(attrReady(attr, attr));
            break;
          case !_.isFunction(val):
            _results.push(attrReady(attr, "(" + val + ").call(this);"));
            break;
          case attr !== 'data':
            _results.push((function() {
              var _results1;
              _results1 = [];
              for (k in val) {
                v = val[k];
                _results1.push(attrReady("data-" + k, v));
              }
              return _results1;
            })());
            break;
          case attr !== 'classes':
            if (val.length) {
              _results.push(attrReady('class', val.join(' ')));
            } else {
              _results.push(void 0);
            }
            break;
          case attr !== 'selected':
            if (val) {
              _results.push(attrReady('selected', 'selected'));
            } else {
              _results.push(void 0);
            }
            break;
          case attr !== 'checked':
            if (val) {
              _results.push(attrReady('checked', 'checked'));
            } else {
              _results.push(void 0);
            }
            break;
          case !(attr === 'style' && _.isObject(val)):
            items = _.map(val, function(v, k) {
              return "" + (changeCase.paramCase(k)) + ":" + (v.toString());
            });
            if (items.length) {
              _results.push(attrReady('style', items.join(';')));
            } else {
              _results.push(void 0);
            }
            break;
          case attr !== 'safe':
            break;
          default:
            _results.push(attrReady(attr, val));
        }
      }
      return _results;
    };

    Renderer.prototype._doctype = function(type) {
      if (type == null) {
        type = 'default';
      }
      return this._text(constants.doctypes[type], true);
    };

    Renderer.prototype._partial = function(path, data) {
      var newData;
      if (data == null) {
        data = {};
      }
      newData = _.extend({}, this._currentData(), data);
      return this._text(this._loadTpl(__helper.partialPath(path))(newData, this.sections), true);
    };

    Renderer.prototype._extend = function(path, data) {
      var newData,
        _this = this;
      if (data == null) {
        data = {};
      }
      newData = _.extend({}, this._currentData(), data);
      return this._currentExtend().push(function() {
        return _this._loadTpl(path)(newData, _this.sections);
      });
    };

    Renderer.prototype._loadTpl = function(path) {
      if (env.isBrowser) {
        if (__helper.cachedTemplates[path] == null) {
          throw new Error("" + this.options.templatePath + " depends on " + path + ", which is missing.");
        }
        return __helper.cachedTemplates[path];
      }
      if (env.isNode) {
        return __helper.compilePathSync(path, this.options);
      }
    };

    Renderer.prototype._yieldContent = function(name, contents) {
      var _base;
      return this._currentSection().push((_base = this.sections)[name] != null ? (_base = this.sections)[name] : _base[name] = []);
    };

    Renderer.prototype._contentFor = function(name, contents) {
      var renderId, _base;
      this.sections[renderId = this._nextRenderId()] = [];
      this.sectionStack.push(renderId);
      this._renderContent(contents);
      ((_base = this.sections)[name] != null ? (_base = this.sections)[name] : _base[name] = []).unshift(this.sections[renderId]);
      delete this.sections[renderId];
      return this.sectionStack.pop();
    };

    Renderer.prototype._text = function(content, safe) {
      if (safe == null) {
        safe = false;
      }
      return this._currentSection().push(safe ? content.toString() : __helper.escapeHTML(content));
    };

    Renderer.prototype._generateResult = function(renderId) {
      return (_.map(this._currentExtend(), function(extend) {
        return extend();
      })).join('') + _.flatten(this.sections[renderId]).join('');
    };

    Renderer.prototype._currentData = function() {
      return this.dataStack[this.dataStack.length - 1];
    };

    Renderer.prototype._currentSection = function() {
      return this.sections[this.sectionStack[this.sectionStack.length - 1]];
    };

    Renderer.prototype._currentExtend = function() {
      return this.extendStack[this.extendStack.length - 1];
    };

    Renderer.prototype._nextRenderId = function() {
      return "_render" + (Renderer._renderId++);
    };

    Renderer.prototype._patchData = function(data) {
      return _.extend(data, {
        env: _.pick(this.options, 'templatePath')
      });
    };

    return Renderer;

  })();

  if (typeof window !== "undefined" && window !== null) {
    if (window.module == null) {
      window.module = {};
    }
  }

  if (typeof module !== "undefined" && module !== null) {
    if (module.exports == null) {
      module.exports = {};
    }
  }

  if (typeof window !== "undefined" && window !== null) {
    if (window.coffiew == null) {
      window.coffiew = module.exports;
    }
  }

  _.extend(module.exports, coffiew, _.pick(__helper, 'compile', 'compilePath', 'compilePathSync', 'ensureLoadTemplate', 'ensureLoadTemplates', 'render'));

  if (env.isNode) {
    module.exports.__express = function(path, options, fn) {
      var err, tpl;
      try {
        tpl = __helper.compilePathSync(path, options);
        return fn(null, tpl(options));
      } catch (_error) {
        err = _error;
        env.onError(path, options, err);
        return fn(err);
      }
    };
  }

}).call(this);
