define(["exports", "./utils", "fable-core", "./dto", "monaco"], function (exports, _utils, _fableCore, _dto, _monaco) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.referenceProvider = exports.definitionProvider = exports.renameProvider = exports.highlighterProvider = exports.signatureProvider = exports.completionProvider = exports.hoverProvider = exports.Communication = undefined;
  exports.convertToInt = convertToInt;
  exports.parseEditor = parseEditor;
  exports.registerServices = registerServices;

  function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    return obj;
  }

  var _hoverProvider, _triggerCharacters, _completionProvider, _mutatorMap, _signatureHelpTrigger, _signatureProvider, _mutatorMap2, _highlighterProvider, _renameProvider, _definitionProvider, _referenceProvider;

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

  var Communication = exports.Communication = function ($exports) {
    var root = (Object.defineProperty($exports, 'root', {
      get: function get() {
        return root;
      },
      set: function set(x) {
        return root = x;
      }
    }), "");

    var request = $exports.request = function request(obj, endpoint, id) {
      _utils.Log.trace("autocomplete", "Calling %s with id %s", endpoint, id);

      if (root === "") {
        throw "Root URL for services not set!";
      }

      var ep = _fableCore.String.fsFormat("%s/%s")(function (x) {
        return x;
      })(root)(endpoint);

      return _utils.Promise.success(function (r) {
        return function (arg00) {
          return JSON.parse(arg00);
        }(r.data[id]);
      }, _utils.Promise.fail(function (e) {
        _utils.Log.exn("autocomplete", "Calling %s failed: %O", ep, e);

        throw "Calling autocomplete service failed";
      }, axios.post(ep, obj)));
    };

    var parse = $exports.parse = function parse(s) {
      return request(s, "parse", 0);
    };

    var completion = $exports.completion = function completion(s) {
      return request(s, "completion", 1);
    };

    var tooltip = $exports.tooltip = function tooltip(s) {
      return request(s, "tooltip", 0);
    };

    var helptext = $exports.helptext = function helptext(s) {
      return request(s, "helptext", 0);
    };

    var methods = $exports.methods = function methods(s) {
      return request(s, "methods", 0);
    };

    var symbolUse = $exports.symbolUse = function symbolUse(s) {
      return request(s, "symboluse", 0);
    };

    var declaration = $exports.declaration = function declaration(s) {
      return request(s, "finddeclaration", 0);
    };

    return $exports;
  }({});

  _monaco = monaco;
  var hoverProvider = exports.hoverProvider = (_hoverProvider = {}, _defineProperty(_hoverProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.HoverProvider"]), _defineProperty(_hoverProvider, "provideHover", function provideHover(model, position, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;

          var res = _fableCore.Seq.fold(function (acc, n) {
            return _fableCore.List.append(_fableCore.Seq.toList(n), acc);
          }, new _fableCore.List(), o.Data).head;

          var h = {};
          var ctn = {};
          ctn.markdown = res.Signature;
          var w = model.getWordAtPosition(position);
          var range = {};
          range.startLineNumber = position.lineNumber;
          range.endLineNumber = position.lineNumber;
          range.startColumn = w.startColumn;
          range.endColumn = w.endColumn;
          h.htmlContent = Array.from(_fableCore.List.ofArray([ctn]));
          h.range = range;
          return _utils.Promise.lift(h);
        }, Communication.tooltip(new _dto.PositionRequest("test.fsx", position.lineNumber, position.column, "")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _hoverProvider);

  function convertToInt(code) {
    return code === "C" ? 6 : code === "E" ? 12 : code === "S" ? 6 : code === "I" ? 7 : code === "N" ? 8 : code === "M" ? 1 : code === "P" ? 9 : code === "F" ? 4 : code === "T" ? 6 : 0;
  }

  var completionProvider = exports.completionProvider = (_completionProvider = {}, _defineProperty(_completionProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.CompletionItemProvider"]), _defineProperty(_completionProvider, "provideCompletionItems", function provideCompletionItems(model, position, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;
          return _utils.Promise.lift(Array.from(o.Data.map(function (d) {
            var ci = {};
            ci.kind = convertToInt(d.GlyphChar);
            ci.label = d.Name;
            ci.insertText = d.ReplacementText;
            return ci;
          })));
        }, Communication.completion(new _dto.CompletionRequest("test.fsx", model.getLineContent(position.lineNumber), position.lineNumber, position.column, "StartsWith")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _defineProperty(_completionProvider, "resolveCompletionItem", function resolveCompletionItem(item, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg2) {
          var o = _arg2;

          var res = _fableCore.Seq.fold(function (acc, n) {
            return _fableCore.List.append(_fableCore.Seq.toList(n), acc);
          }, new _fableCore.List(), o.Data.Overloads).head;

          item.documentation = res.Comment;
          item.detail = res.Signature;
          return _utils.Promise.lift(item);
        }, Communication.helptext(new _dto.HelptextRequest(item.label)));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _triggerCharacters = "triggerCharacters", _mutatorMap = {}, _mutatorMap[_triggerCharacters] = _mutatorMap[_triggerCharacters] || {}, _mutatorMap[_triggerCharacters].get = function () {
    return Array.from(_fableCore.List.ofArray(["."]));
  }, _defineEnumerableProperties(_completionProvider, _mutatorMap), _completionProvider);

  function parseEditor(model) {
    return function (builder_) {
      return function (unitVar) {
        var content = model.getValue(0, true);
        return _utils.Promise.bind(function (_arg1) {
          var res = _arg1;
          return _utils.Promise.lift();
        }, Communication.parse(new _dto.ParseRequest("test.fsx", true, content.split("\n"))));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }

  var signatureProvider = exports.signatureProvider = (_signatureProvider = {}, _defineProperty(_signatureProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.SignatureHelpProvider"]), _signatureHelpTrigger = "signatureHelpTriggerCharacters", _mutatorMap2 = {}, _mutatorMap2[_signatureHelpTrigger] = _mutatorMap2[_signatureHelpTrigger] || {}, _mutatorMap2[_signatureHelpTrigger].get = function () {
    return Array.from(_fableCore.List.ofArray(["(", ","]));
  }, _defineProperty(_signatureProvider, "provideSignatureHelp", function provideSignatureHelp(model, position, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;
          var res = {};
          var sigs = o.Data.Overloads.map(function (c) {
            var tip = c.Tip[0][0];
            var si = {};
            si.label = tip.Signature;
            si.documentation = tip.Comment;
            si.parameters = [];
            {
              var arr = c.Parameters;

              for (var idx = 0; idx <= arr.length - 1; idx++) {
                var p = arr[idx];
                var pi = {};
                pi.label = p.Name;
                pi.documentation = p.CanonicalTypeTextForSorting;
                si.parameters.push(pi);
              }
            }
            return si;
          });
          var sigIndex = Array.from(_fableCore.Seq.sortWith(function (x, y) {
            return _fableCore.Util.compare(function (n) {
              return n.parameters.length;
            }(x), function (n) {
              return n.parameters.length;
            }(y));
          }, sigs)).findIndex(function (s) {
            return s.parameters.length >= o.Data.CurrentParameter;
          });
          res.activeParameter = o.Data.CurrentParameter;
          res.activeSignature = sigIndex + 1;
          res.signatures = Array.from(sigs);
          return _utils.Promise.lift(res);
        }, Communication.methods(new _dto.PositionRequest("test.fsx", position.lineNumber, position.column, "")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _defineEnumerableProperties(_signatureProvider, _mutatorMap2), _signatureProvider);
  var highlighterProvider = exports.highlighterProvider = (_highlighterProvider = {}, _defineProperty(_highlighterProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.DocumentHighlightProvider"]), _defineProperty(_highlighterProvider, "provideDocumentHighlights", function provideDocumentHighlights(model, position, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;
          return _utils.Promise.lift(Array.from(o.Data.Uses.map(function (d) {
            var res = {};
            res.range = new _monaco.Range(d.StartLine, d.StartColumn, d.EndLine, d.EndColumn);
            res.kind = 0;
            return res;
          })));
        }, Communication.symbolUse(new _dto.PositionRequest("test.fsx", position.lineNumber, position.column, "")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _highlighterProvider);
  var renameProvider = exports.renameProvider = (_renameProvider = {}, _defineProperty(_renameProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.RenameProvider"]), _defineProperty(_renameProvider, "provideRenameEdits", function provideRenameEdits(model, position, newName, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;
          var we = {};
          we.edits = Array.from(o.Data.Uses.map(function (s) {
            var range = new _monaco.Range(s.StartLine, s.EndColumn - o.Data.Name.length, s.EndLine, s.EndColumn);
            var re = {};
            re.newText = newName;
            re.resource = model.uri;
            re.range = range;
            return re;
          }));
          return _utils.Promise.lift(we);
        }, Communication.symbolUse(new _dto.PositionRequest("test.fsx", position.lineNumber, position.column, "")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _renameProvider);
  var definitionProvider = exports.definitionProvider = (_definitionProvider = {}, _defineProperty(_definitionProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.DefinitionProvider"]), _defineProperty(_definitionProvider, "provideDefinition", function provideDefinition(model, position, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;
          var d = {};
          d.range = new _monaco.Range(o.Data.Line, o.Data.Column, o.Data.Line, o.Data.Column);
          d.uri = model.uri;
          return _utils.Promise.lift(d);
        }, Communication.declaration(new _dto.PositionRequest("test.fsx", position.lineNumber, position.column, "")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _definitionProvider);
  var referenceProvider = exports.referenceProvider = (_referenceProvider = {}, _defineProperty(_referenceProvider, _fableCore.Symbol.interfaces, ["Fable.Import.monaco.languages.ReferenceProvider"]), _defineProperty(_referenceProvider, "provideReferences", function provideReferences(model, position, ctx, token) {
    return function (builder_) {
      return function (unitVar) {
        return _utils.Promise.bind(function (_arg1) {
          var o = _arg1;
          return _utils.Promise.lift(Array.from(o.Data.Uses.map(function (d) {
            var res = {};
            res.range = new _monaco.Range(d.StartLine - 1, d.StartColumn, d.EndLine - 1, d.EndColumn);
            return res;
          })));
        }, Communication.symbolUse(new _dto.PositionRequest("test.fsx", position.lineNumber, position.column, "")));
      }();
    }(_utils.PromiseBuilderImp.promise);
  }), _referenceProvider);

  function registerServices(root) {
    Communication.root = root;

    _monaco.languages.registerHoverProvider("fsharp", hoverProvider);

    _monaco.languages.registerCompletionItemProvider("fsharp", completionProvider);

    _monaco.languages.registerSignatureHelpProvider("fsharp", signatureProvider);

    _monaco.languages.registerDocumentHighlightProvider("fsharp", highlighterProvider);

    _monaco.languages.registerRenameProvider("fsharp", renameProvider);

    _monaco.languages.registerDefinitionProvider("fsharp", definitionProvider);

    _monaco.languages.registerReferenceProvider("fsharp", referenceProvider);
  }
});