define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Html = exports.PromiseBuilderImp = exports.PromiseBuilder = exports.Promise = exports.Log = exports.LogHelpers = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var LogHelpers = exports.LogHelpers = function ($exports) {
    var isLocalHost = $exports.isLocalHost = function isLocalHost() {
      return window.location.hostname === "localhost" ? true : window.location.hostname === "127.0.0.1";
    };

    var enabledCategories = $exports.enabledCategories = !isLocalHost() ? _fableCore.Set.create(new _fableCore.List(), new _fableCore.GenericComparer(function (x, y) {
      return x < y ? -1 : x > y ? 1 : 0;
    })) : _fableCore.Set.create(_fableCore.List.ofArray(["AUTOCOMPLETE", "FSI", "FSIGUI"]), new _fableCore.GenericComparer(function (x, y) {
      return x < y ? -1 : x > y ? 1 : 0;
    }));
    return $exports;
  }({});

  var Log = exports.Log = function () {
    function Log() {
      _classCallCheck(this, Log);
    }

    _createClass(Log, null, [{
      key: "message",
      value: function message(level, category, msg) {
        for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
          args[_key - 3] = arguments[_key];
        }

        var args_1 = args == null ? [] : args;
        var category_1 = category.toLocaleUpperCase();

        if ((level === "EXCEPTION" ? true : level === "ERROR") ? true : LogHelpers.enabledCategories.has(category_1)) {
          var dt = _fableCore.Date.now();

          var p2 = function p2(s) {
            return _fableCore.String.padLeft(String(s), 2, "0");
          };

          var p4 = function p4(s) {
            return _fableCore.String.padLeft(String(s), 4, "0");
          };

          var prefix = _fableCore.String.fsFormat("[%s:%s:%s:%s] %s: ")(function (x) {
            return x;
          })(p2(_fableCore.Date.hour(dt)))(p2(_fableCore.Date.minute(dt)))(p2(_fableCore.Date.second(dt)))(p4(_fableCore.Date.millisecond(dt)))(category_1);

          var color = level === "TRACE" ? "color:#808080" : level === "EXCEPTION" ? "color:#c00000" : level === "ERROR" ? "color:#900000" : "";
          console.log.apply(console, Array.from(_fableCore.Seq.append(["%c" + prefix + msg, color], args_1)));
        }
      }
    }, {
      key: "trace",
      value: function trace(category, msg) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        Log.message.apply(Log, ["TRACE", category, msg].concat(args));
      }
    }, {
      key: "exn",
      value: function exn(category, msg) {
        for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        Log.message.apply(Log, ["EXCEPTION", category, msg].concat(args));
      }
    }, {
      key: "error",
      value: function error(category, msg) {
        for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          args[_key4 - 2] = arguments[_key4];
        }

        Log.message.apply(Log, ["ERROR", category, msg].concat(args));
      }
    }]);

    return Log;
  }();

  _fableCore.Util.setInterfaces(Log.prototype, [], "Ionide.Web.Log");

  var _Promise = function ($exports) {
    var success = $exports.success = function success(a, pr) {
      return pr.then(a);
    };

    var bind = $exports.bind = function bind(a, pr) {
      return pr.then(a);
    };

    var fail = $exports.fail = function fail(a, pr) {
      return pr.catch(a);
    };

    var either = $exports.either = function either(a, b, pr) {
      return pr.then(a, b);
    };

    var lift = $exports.lift = function lift(a) {
      return Promise.resolve(a);
    };

    return $exports;
  }({});

  exports.Promise = _Promise;

  var PromiseBuilder = exports.PromiseBuilder = function PromiseBuilder() {
    _classCallCheck(this, PromiseBuilder);
  };

  _fableCore.Util.setInterfaces(PromiseBuilder.prototype, [], "Ionide.Web.PromiseBuilder");

  var PromiseBuilderImp = exports.PromiseBuilderImp = function ($exports) {
    var promise = $exports.promise = new PromiseBuilder();
    return $exports;
  }({});

  var Html = exports.Html = function ($exports) {
    var DomAttribute = $exports.DomAttribute = function DomAttribute(caseName, fields) {
      _classCallCheck(this, DomAttribute);

      this.Case = caseName;
      this.Fields = fields;
    };

    _fableCore.Util.setInterfaces(DomAttribute.prototype, ["FSharpUnion"], "Ionide.Web.Html.DomAttribute");

    var DomNode = $exports.DomNode = function DomNode(caseName, fields) {
      _classCallCheck(this, DomNode);

      this.Case = caseName;
      this.Fields = fields;
    };

    _fableCore.Util.setInterfaces(DomNode.prototype, ["FSharpUnion"], "Ionide.Web.Html.DomNode");

    var render = $exports.render = function render(node) {
      return node.Case === "Element" ? function () {
        var tag = node.Fields[0];
        var children = node.Fields[2];
        var attrs = node.Fields[1];
        var el = document.createElement(tag);

        for (var idx = 0; idx <= children.length - 1; idx++) {
          var c = children[idx];
          el.appendChild(render(c));
        }

        for (var idx = 0; idx <= attrs.length - 1; idx++) {
          var forLoopVar = attrs[idx];
          var k = forLoopVar[0];
          var a = forLoopVar[1];

          if (a.Case === "Event") {
            var f = a.Fields[0];
            el.addEventListener(k, function (delegateArg0) {
              f(el)(delegateArg0);
            });
          } else {
            var v = a.Fields[0];
            el.setAttribute(k, v);
          }
        }

        return el;
      }() : function () {
        var s = node.Fields[0];
        return document.createTextNode(s);
      }();
    };

    var renderTo = $exports.renderTo = function renderTo(node, dom) {
      while (node.lastChild != null) {
        node.removeChild(node.lastChild);
      }

      node.appendChild(render(dom));
    };

    var text = $exports.text = function text(s) {
      return new DomNode("Text", [s]);
    };

    var op_EqualsGreater = $exports.op_EqualsGreater = function op_EqualsGreater(k, v) {
      return [k, new DomAttribute("Property", [v])];
    };

    var op_EqualsBangGreater = $exports.op_EqualsBangGreater = function op_EqualsBangGreater(k, f) {
      return [k, new DomAttribute("Event", [f])];
    };

    var El = $exports.El = function () {
      function El() {
        _classCallCheck(this, El);
      }

      _createClass(El, null, [{
        key: "op_Dynamic",
        value: function op_Dynamic(_arg1, n) {
          return function (a) {
            return function (b) {
              return new DomNode("Element", [n, Array.from(a), Array.from(b)]);
            };
          };
        }
      }]);

      return El;
    }();

    _fableCore.Util.setInterfaces(El.prototype, [], "Ionide.Web.Html.El");

    var h = $exports.h = new El();
    return $exports;
  }({});
});