define(["exports", "fable-core", "./utils"], function (exports, _fableCore, _utils) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Output = exports.Zones = exports.Globals = exports.Fable = exports.FableResult = exports.Declaration = exports.Message = exports.JsInterop = exports.BabelResult = exports.BabelOptions = undefined;
  exports.registerService = registerService;
  exports.createInteractiveService = createInteractiveService;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  var BabelOptions = exports.BabelOptions = function () {
    function BabelOptions(presets, plugins) {
      _classCallCheck(this, BabelOptions);

      this.presets = presets;
      this.plugins = plugins;
    }

    _createClass(BabelOptions, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }]);

    return BabelOptions;
  }();

  _fableCore.Util.setInterfaces(BabelOptions.prototype, ["FSharpRecord", "System.IEquatable"], "Ionide.Web.FsiService.BabelOptions");

  var BabelResult = exports.BabelResult = function () {
    function BabelResult(code) {
      _classCallCheck(this, BabelResult);

      this.code = code;
    }

    _createClass(BabelResult, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareRecords(this, other);
      }
    }]);

    return BabelResult;
  }();

  _fableCore.Util.setInterfaces(BabelResult.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.FsiService.BabelResult");

  var JsInterop = exports.JsInterop = function ($exports) {
    return $exports;
  }({});

  var Message = exports.Message = function () {
    function Message(kind, message) {
      _classCallCheck(this, Message);

      this.kind = kind;
      this.message = message;
    }

    _createClass(Message, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareRecords(this, other);
      }
    }]);

    return Message;
  }();

  _fableCore.Util.setInterfaces(Message.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.FsiService.Message");

  var Declaration = exports.Declaration = function () {
    function Declaration(name, type) {
      _classCallCheck(this, Declaration);

      this.name = name;
      this.type = type;
    }

    _createClass(Declaration, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareRecords(this, other);
      }
    }]);

    return Declaration;
  }();

  _fableCore.Util.setInterfaces(Declaration.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.FsiService.Declaration");

  var FableResult = exports.FableResult = function () {
    function FableResult(compiled, declarations, messages) {
      _classCallCheck(this, FableResult);

      this.compiled = compiled;
      this.declarations = declarations;
      this.messages = messages;
    }

    _createClass(FableResult, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }]);

    return FableResult;
  }();

  _fableCore.Util.setInterfaces(FableResult.prototype, ["FSharpRecord", "System.IEquatable"], "Ionide.Web.FsiService.FableResult");

  var Fable = exports.Fable = function ($exports) {
    var root = (Object.defineProperty($exports, 'root', {
      get: function get() {
        return root;
      },
      set: function set(x) {
        return root = x;
      }
    }), "");

    var compile = $exports.compile = function compile(text) {
      return function (builder_) {
        return function (unitVar) {
          _utils.Log.trace("fsi", "Calling %s", root + "/fable");

          return _utils.Promise.bind(function (unitVar0) {
            return function (unitVar_1) {
              return _utils.Promise.bind(function (_arg1) {
                var res = _arg1;
                return _utils.Promise.lift(res.data);
              }, _utils.Promise.fail(function (e) {
                _utils.Log.exn("fsi", "Calling %s failed: %O", root + "/fable", e);

                throw "Calling autocomplete service failed";
              }, axios.post(root + "/fable", text)));
            }();
          }, root === "" ? function () {
            throw "Root URL for services not set!";
            return Promise.resolve();
          }() : Promise.resolve());
        }();
      }(_utils.PromiseBuilderImp.promise);
    };

    return $exports;
  }({});

  var Globals = exports.Globals = function () {
    function Globals() {
      _classCallCheck(this, Globals);

      this.globals = _fableCore.Map.create(null, new _fableCore.GenericComparer(function (x, y) {
        return x < y ? -1 : x > y ? 1 : 0;
      }));
    }

    _createClass(Globals, [{
      key: "ReadDeclarations",
      value: function ReadDeclarations(decls, exports) {
        return decls.map(function (d) {
          return [d, exports[d.name]];
        });
      }
    }, {
      key: "AddDeclarations",
      value: function AddDeclarations(decls) {
        this.globals = _fableCore.Seq.fold(function (globals, tupledArg) {
          var d = tupledArg[0];
          var v = tupledArg[1];

          _utils.Log.trace("fsi", "Adding declaration %s:%s = %O", d.name, d.type, v);

          return _fableCore.Map.add(d.name, [d.type, v], globals);
        }, this.globals, decls);
      }
    }, {
      key: "GetBindings",
      value: function GetBindings(varName) {
        var _this = this;

        return _fableCore.String.join("\n", _fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
          return !_fableCore.Map.isEmpty(_this.globals) ? _fableCore.Seq.append(_fableCore.Seq.singleton("module Globals = "), _fableCore.Seq.delay(function (unitVar_1) {
            return _fableCore.Seq.append(_fableCore.Seq.collect(function (d) {
              return _fableCore.Seq.append(_fableCore.Seq.singleton("  [<Fable.Core.Emit(\"" + varName + "." + d[0] + "\")>]"), _fableCore.Seq.delay(function (unitVar_2) {
                return _fableCore.Seq.singleton("  let " + d[0] + " : " + d[1][0] + " = failwith \"JS\"");
              }));
            }, _this.globals), _fableCore.Seq.delay(function (unitVar_2) {
              return _fableCore.Seq.singleton("open Globals\n");
            }));
          })) : _fableCore.Seq.empty();
        })));
      }
    }, {
      key: "GetObject",
      value: function GetObject() {
        var _this2 = this;

        return _fableCore.Util.createObj(_fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
          return _fableCore.Seq.map(function (kv) {
            return [kv[0], kv[1][1]];
          }, _this2.globals);
        })));
      }
    }]);

    return Globals;
  }();

  _fableCore.Util.setInterfaces(Globals.prototype, [], "Ionide.Web.FsiService.Globals");

  var Zones = exports.Zones = function () {
    function Zones(ed) {
      _classCallCheck(this, Zones);

      this.ed = ed;
      this.allZones = new _fableCore.List();
      this.zoneTops = new Map();
    }

    _createClass(Zones, [{
      key: "RemoveAllZones",
      value: function RemoveAllZones() {
        var _this3 = this;

        this.ed.changeViewZones(function (accessor) {
          {
            var inputSequence = _this3.allZones;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = inputSequence[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var forLoopVar = _step.value;
                var id = forLoopVar[0];
                accessor.removeZone(id);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }

          _this3.zoneTops.clear();

          _this3.allZones = new _fableCore.List();
        });
      }
    }, {
      key: "CreateAndAddZone",
      value: function CreateAndAddZone(startLine, endLine, col) {
        var _this4 = this;

        _utils.Log.trace("fsigui", "Creating zone at (%s, %s)", endLine, col);

        var zoneId = -1;
        var zone = {};
        var top = this.ed.getTopForPosition(startLine, col);
        var node = document.createElement('div');
        var wrapper = document.createElement('div');
        wrapper.className = "fsi-wrapper";
        node.appendChild(wrapper);
        node.style.background = "#f0f0f0";
        this.ed.changeViewZones(function (accessor) {
          var patternInput = _fableCore.List.partition(function (tupledArg) {
            var id = tupledArg[0];
            var z = tupledArg[1];
            return _this4.zoneTops.get(id) >= top;
          }, _this4.allZones);

          var stay = patternInput[1];
          var remove = patternInput[0];
          _this4.allZones = stay;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = remove[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var forLoopVar = _step2.value;
              var z = forLoopVar[1];
              var id = forLoopVar[0];

              _utils.Log.trace("fsigui", "Removing zone %s", id);

              accessor.removeZone(id);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          zone.afterLineNumber = endLine;
          zone.heightInPx = 1;
          zone.domNode = node;
          zoneId = accessor.addZone(zone);
          _this4.allZones = _fableCore.List.ofArray([[zoneId, zone]], _this4.allZones);

          zone.onDomNodeTop = function (t) {
            _this4.zoneTops.set(zoneId, t);
          };
        });
        return [zoneId, zone, wrapper];
      }
    }]);

    return Zones;
  }();

  _fableCore.Util.setInterfaces(Zones.prototype, [], "Ionide.Web.FsiService.Zones");

  var Output = exports.Output = function () {
    function Output(caseName, fields) {
      _classCallCheck(this, Output);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Output, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsUnions(this, other);
      }
    }]);

    return Output;
  }();

  _fableCore.Util.setInterfaces(Output.prototype, ["FSharpUnion", "System.IEquatable"], "Ionide.Web.FsiService.Output");

  function runCompiledCode(decls, code, globals) {
    var op_Dynamic = function op_Dynamic(o) {
      return function (prop) {
        return o[prop];
      };
    };

    var results = [];

    (function (list) {
      return list.head;
    });

    var consoleLog = function consoleLog(s) {
      results.push(new Output("PrintedOutput", [s]));
    };

    var code_1 = _fableCore.String.replace(code, "console.log", "consoleLog");

    var hiddenIonideGlobals = globals.GetObject();

    _utils.Log.trace("fsi", "Evaluating compiled code: %s\nGlobals: %O", code_1, hiddenIonideGlobals);

    var patternInput = function () {
      var exports = {};
      var res = eval(code_1);
      return [exports, res];
    }();

    var it = patternInput[1];
    var exports = patternInput[0];
    var bindings = globals.ReadDeclarations(decls, exports);
    globals.AddDeclarations(bindings);

    for (var idx = 0; idx <= bindings.length - 1; idx++) {
      var forLoopVar = bindings[idx];
      var v = forLoopVar[1];
      var d = forLoopVar[0];
      results.push(new Output("Declaration", [d.name, d.type, v]));
    }

    if (it != null ? op_Dynamic(it)("__esModule") == null : false) {
      results.push(new Output("ItValue", [it]));
    }

    return _fableCore.Seq.toList(results);
  }

  function formatValue(value) {
    return _utils.Html.text(_fableCore.Util.toString(value));
  }

  function formatMessages(messages) {
    return function (arg0) {
      return function (arg1) {
        return _utils.Html.El.op_Dynamic(arg0, arg1);
      };
    }(_utils.Html.h)("ul")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "messages")]))(_fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
      return _fableCore.Seq.map(function (msg) {
        return function (arg0) {
          return function (arg1) {
            return _utils.Html.El.op_Dynamic(arg0, arg1);
          };
        }(_utils.Html.h)("li")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", msg.kind)]))(_fableCore.List.ofArray([function (arg0) {
          return function (arg1) {
            return _utils.Html.El.op_Dynamic(arg0, arg1);
          };
        }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "kind")]))(_fableCore.List.ofArray([_utils.Html.text(msg.kind)])), function (arg0) {
          return function (arg1) {
            return _utils.Html.El.op_Dynamic(arg0, arg1);
          };
        }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "msg")]))(_fableCore.List.ofArray([_utils.Html.text(msg.message)]))]));
      }, messages);
    })));
  }

  function appendMessages(element, messages) {
    (function (dom) {
      _utils.Html.renderTo(element, dom);
    })(function (arg0) {
      return function (arg1) {
        return _utils.Html.El.op_Dynamic(arg0, arg1);
      };
    }(_utils.Html.h)("div")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "fsi-output")]))(_fableCore.List.ofArray([function (arg0) {
      return function (arg1) {
        return _utils.Html.El.op_Dynamic(arg0, arg1);
      };
    }(_utils.Html.h)("h3")(new _fableCore.List())(_fableCore.List.ofArray([_utils.Html.text("Error messages")])), formatMessages(messages)])));
  }

  function appendResults(element, messages, results) {
    var prints = _fableCore.List.choose(function (_arg1) {
      return _arg1.Case === "PrintedOutput" ? function () {
        var s = _arg1.Fields[0];
        return s;
      }() : null;
    }, results);

    var decls = _fableCore.List.choose(function (_arg2) {
      return _arg2.Case === "Declaration" ? function () {
        var v = _arg2.Fields[2];
        var t = _arg2.Fields[1];
        var n = _arg2.Fields[0];
        return [n, t, v];
      }() : null;
    }, results);

    var itval = _fableCore.Seq.tryPick(function (_arg3) {
      return _arg3.Case === "ItValue" ? function () {
        var v = _arg3.Fields[0];
        return v;
      }() : null;
    }, results);

    var declarations = function declarations(unitVar0) {
      return function (arg0) {
        return function (arg1) {
          return _utils.Html.El.op_Dynamic(arg0, arg1);
        };
      }(_utils.Html.h)("ul")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "declarations")]))(_fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
        return _fableCore.Seq.collect(function (matchValue) {
          var v = matchValue[2];
          var t = matchValue[1];
          var n = matchValue[0];
          return _fableCore.Seq.singleton(function (arg0) {
            return function (arg1) {
              return _utils.Html.El.op_Dynamic(arg0, arg1);
            };
          }(_utils.Html.h)("li")(new _fableCore.List())(_fableCore.List.ofArray([function (arg0) {
            return function (arg1) {
              return _utils.Html.El.op_Dynamic(arg0, arg1);
            };
          }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "sep")]))(_fableCore.List.ofArray([_utils.Html.text("val")])), function (arg0) {
            return function (arg1) {
              return _utils.Html.El.op_Dynamic(arg0, arg1);
            };
          }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "name")]))(_fableCore.List.ofArray([_utils.Html.text(n)])), function (arg0) {
            return function (arg1) {
              return _utils.Html.El.op_Dynamic(arg0, arg1);
            };
          }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "sep")]))(_fableCore.List.ofArray([_utils.Html.text(":")])), function (arg0) {
            return function (arg1) {
              return _utils.Html.El.op_Dynamic(arg0, arg1);
            };
          }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "typ")]))(_fableCore.List.ofArray([_utils.Html.text(t)])), function (arg0) {
            return function (arg1) {
              return _utils.Html.El.op_Dynamic(arg0, arg1);
            };
          }(_utils.Html.h)("span")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "sep")]))(_fableCore.List.ofArray([_utils.Html.text("=")])), formatValue(v)])));
        }, decls);
      })));
    };

    (function (dom) {
      _utils.Html.renderTo(element, dom);
    })(function (arg0) {
      return function (arg1) {
        return _utils.Html.El.op_Dynamic(arg0, arg1);
      };
    }(_utils.Html.h)("div")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "fsi-output")]))(_fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
      return _fableCore.Seq.append(!(messages.length === 0) ? _fableCore.Seq.append(_fableCore.Seq.singleton(function (arg0) {
        return function (arg1) {
          return _utils.Html.El.op_Dynamic(arg0, arg1);
        };
      }(_utils.Html.h)("h3")(new _fableCore.List())(_fableCore.List.ofArray([_utils.Html.text("Error messages")]))), _fableCore.Seq.delay(function (unitVar_1) {
        return _fableCore.Seq.singleton(formatMessages(messages));
      })) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_1) {
        return _fableCore.Seq.append(!(decls.tail == null) ? _fableCore.Seq.append(_fableCore.Seq.singleton(function (arg0) {
          return function (arg1) {
            return _utils.Html.El.op_Dynamic(arg0, arg1);
          };
        }(_utils.Html.h)("h3")(new _fableCore.List())(_fableCore.List.ofArray([_utils.Html.text("Declarations")]))), _fableCore.Seq.delay(function (unitVar_2) {
          return _fableCore.Seq.singleton(declarations());
        })) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_2) {
          return _fableCore.Seq.append(_fableCore.Seq.collect(function (p) {
            return _fableCore.Seq.append(_fableCore.Seq.singleton(function (arg0) {
              return function (arg1) {
                return _utils.Html.El.op_Dynamic(arg0, arg1);
              };
            }(_utils.Html.h)("h3")(new _fableCore.List())(_fableCore.List.ofArray([_utils.Html.text("Program output")]))), _fableCore.Seq.delay(function (unitVar_3) {
              return _fableCore.Seq.singleton(function (arg0) {
                return function (arg1) {
                  return _utils.Html.El.op_Dynamic(arg0, arg1);
                };
              }(_utils.Html.h)("p")(new _fableCore.List())(_fableCore.List.ofArray([_utils.Html.text(p)])));
            }));
          }, prints), _fableCore.Seq.delay(function (unitVar_3) {
            return itval != null ? function () {
              var v = itval;
              return _fableCore.Seq.append(_fableCore.Seq.singleton(function (arg0) {
                return function (arg1) {
                  return _utils.Html.El.op_Dynamic(arg0, arg1);
                };
              }(_utils.Html.h)("h3")(new _fableCore.List())(_fableCore.List.ofArray([_utils.Html.text("Returned value")]))), _fableCore.Seq.delay(function (unitVar_4) {
                return _fableCore.Seq.singleton(function (arg0) {
                  return function (arg1) {
                    return _utils.Html.El.op_Dynamic(arg0, arg1);
                  };
                }(_utils.Html.h)("p")(_fableCore.List.ofArray([_utils.Html.op_EqualsGreater("class", "it")]))(_fableCore.List.ofArray([formatValue(v)])));
              }));
            }() : function () {
              return _fableCore.Seq.empty();
            }();
          }));
        }));
      }));
    }))));
  }

  function registerService(root) {
    Fable.root = root;
  }

  function createInteractiveService(ed) {
    var _ref;

    var zones = new Zones(ed);
    var globals = new Globals();
    var test = null;
    ed.onKeyDown(function (e) {
      if (e.keyCode === 9) {
        zones.RemoveAllZones();
      } else {
        if (e.altKey ? e.keyCode === 3 : false) {
          var sel = ed.getSelection();
          var lineStr = ed.getModel().getLineContent(sel.endLineNumber);

          _utils.Log.trace("fsigui", "Current line (%d): '%s', end column: %s", sel.endLineNumber, lineStr, sel.endColumn);

          var lineStr_1 = lineStr.substr(0, Math.floor(sel.endColumn) - 1);
          var patternInput = (_fableCore.String.isNullOrWhiteSpace(lineStr_1) ? sel.endLineNumber > sel.startLineNumber : false) ? [sel.endLineNumber - 1, 0] : [sel.endLineNumber, 0];
          var line = patternInput[0];
          var col = patternInput[1];
          var patternInput_1 = zones.CreateAndAddZone(sel.startLineNumber, line, col);
          var zoneId = patternInput_1[0];
          var zone = patternInput_1[1];
          var wrapper = patternInput_1[2];
          var text = ed.getModel().getValueInRange(sel);
          var text_1 = globals.GetBindings("hiddenIonideGlobals") + text;

          _utils.Log.trace("fsi", "Sending code to Fable: %s", text_1);

          _utils.Promise.success(function (res) {
            _utils.Log.trace("fsi", "Fable returned: %O", res);

            if (test != null) {
              var f = test[1];
              f();
            }

            var opts = new BabelOptions(["es2015"], function () {
              var removeNullStatements = {
                visitor: {
                  ExpressionStatement: function ExpressionStatement(path) {
                    if (path.node.expression.type == "NullLiteral") path.remove();
                  }
                }
              };
              var transformMacroExpressions = {
                visitor: {
                  StringLiteral: function StringLiteral(path) {
                    if (!path.node.macro) return;

                    try {
                      var buildArgs = {},
                          args = path.node.args;

                      for (var i = 0; i < args.length; i++) {
                        buildArgs["$" + i] = args[i];
                      }

                      var tmp = path.node.value.replace(/\$(\d+)\.\.\./, function (m, i) {
                        var rep = [],
                            j = parseInt(i);

                        for (; j < args.length; j++) {
                          rep.push("$" + j);
                        }

                        return rep.join(",");
                      }).replace(/\{\{\$(\d+)\?(.*?)\:(.*?)\}\}/g, function (_, g1, g2, g3) {
                        var i = parseInt(g1);
                        return i < args.length && args[i].value ? g2 : g3;
                      }).replace(/\{\{([^\}]*\$(\d+).*?)\}\}/g, function (_, g1, g2) {
                        var i = parseInt(g2);
                        return i < args.length ? g1 : "";
                      });
                      var buildMacro = Babel.template(tmp);
                      path.replaceWithMultiple(buildMacro(buildArgs));
                    } catch (err) {
                      console.log("BABEL ERROR: Failed to parse macro: " + path.node.value);
                      console.log(err.message);

                      if (opts.verbose && err.stack) {
                        console.log(err.stack);
                      }

                      process.exit(1);
                    }
                  }
                }
              };
              return [transformMacroExpressions, removeNullStatements];
            }());
            var messages = res.messages.filter(function (msg) {
              return !(msg.message.indexOf("The result of this expression is implicitly ignored") >= 0);
            });

            if (null == res.compiled) {
              appendMessages(wrapper, messages);
            } else {
              var code = Babel.transformFromAst(res.compiled, text_1, opts);

              _utils.Log.trace("fsi", "Babel returned: %O", code);

              var results = runCompiledCode(res.declarations, code.code, globals);
              appendResults(wrapper, messages, results);
            }

            zone.heightInPx = wrapper.clientHeight;
            ed.changeViewZones(function (a) {
              a.layoutZone(zoneId);
            });
          }, Fable.compile(text_1));
        }
      }
    });
    return _ref = {}, _defineProperty(_ref, _fableCore.Symbol.interfaces, ["Ionide.Web.FsiService.IInteractiveService"]), _defineProperty(_ref, "SetTestCode", function SetTestCode(code, callback) {
      test = [code, callback];
    }), _ref;
  }
});