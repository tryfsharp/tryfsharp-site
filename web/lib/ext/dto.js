define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Result = exports.Symbols = exports.Symbol = exports.Range = exports.CompilerLocation = exports.Method = exports.Overload = exports.OverloadParameter = exports.Helptext = exports.SymbolUses = exports.SymbolUse = exports.Completion = exports.Declaration = exports.Error = exports.OverloadSignature = exports.CompletionRequest = exports.PositionRequest = exports.HelptextRequest = exports.DeclarationsRequest = exports.ProjectRequest = exports.ParseRequest = undefined;

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

  var ParseRequest = exports.ParseRequest = function () {
    function ParseRequest(fileName, isAsync, lines) {
      _classCallCheck(this, ParseRequest);

      this.FileName = fileName;
      this.IsAsync = isAsync;
      this.Lines = lines;
    }

    _createClass(ParseRequest, [{
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

    return ParseRequest;
  }();

  _fableCore.Util.setInterfaces(ParseRequest.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.ParseRequest");

  var ProjectRequest = exports.ProjectRequest = function () {
    function ProjectRequest(fileName) {
      _classCallCheck(this, ProjectRequest);

      this.FileName = fileName;
    }

    _createClass(ProjectRequest, [{
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

    return ProjectRequest;
  }();

  _fableCore.Util.setInterfaces(ProjectRequest.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.ProjectRequest");

  var DeclarationsRequest = exports.DeclarationsRequest = function () {
    function DeclarationsRequest(fileName) {
      _classCallCheck(this, DeclarationsRequest);

      this.FileName = fileName;
    }

    _createClass(DeclarationsRequest, [{
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

    return DeclarationsRequest;
  }();

  _fableCore.Util.setInterfaces(DeclarationsRequest.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.DeclarationsRequest");

  var HelptextRequest = exports.HelptextRequest = function () {
    function HelptextRequest(symbol) {
      _classCallCheck(this, HelptextRequest);

      this.Symbol = symbol;
    }

    _createClass(HelptextRequest, [{
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

    return HelptextRequest;
  }();

  _fableCore.Util.setInterfaces(HelptextRequest.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.HelptextRequest");

  var PositionRequest = exports.PositionRequest = function () {
    function PositionRequest(fileName, line, column, filter) {
      _classCallCheck(this, PositionRequest);

      this.FileName = fileName;
      this.Line = line;
      this.Column = column;
      this.Filter = filter;
    }

    _createClass(PositionRequest, [{
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

    return PositionRequest;
  }();

  _fableCore.Util.setInterfaces(PositionRequest.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.PositionRequest");

  var CompletionRequest = exports.CompletionRequest = function () {
    function CompletionRequest(fileName, sourceLine, line, column, filter) {
      _classCallCheck(this, CompletionRequest);

      this.FileName = fileName;
      this.SourceLine = sourceLine;
      this.Line = line;
      this.Column = column;
      this.Filter = filter;
    }

    _createClass(CompletionRequest, [{
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

    return CompletionRequest;
  }();

  _fableCore.Util.setInterfaces(CompletionRequest.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.CompletionRequest");

  var OverloadSignature = exports.OverloadSignature = function () {
    function OverloadSignature(signature, comment) {
      _classCallCheck(this, OverloadSignature);

      this.Signature = signature;
      this.Comment = comment;
    }

    _createClass(OverloadSignature, [{
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

    return OverloadSignature;
  }();

  _fableCore.Util.setInterfaces(OverloadSignature.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.OverloadSignature");

  var Error = exports.Error = function () {
    function Error(startLine, startColumn, endLine, endColumn, message, severity, subcategory, fileName) {
      _classCallCheck(this, Error);

      this.StartLine = startLine;
      this.StartColumn = startColumn;
      this.EndLine = endLine;
      this.EndColumn = endColumn;
      this.Message = message;
      this.Severity = severity;
      this.Subcategory = subcategory;
      this.FileName = fileName;
    }

    _createClass(Error, [{
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

    return Error;
  }();

  _fableCore.Util.setInterfaces(Error.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Error");

  var Declaration = exports.Declaration = function () {
    function Declaration(file, line, column) {
      _classCallCheck(this, Declaration);

      this.File = file;
      this.Line = line;
      this.Column = column;
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

  _fableCore.Util.setInterfaces(Declaration.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Declaration");

  var Completion = exports.Completion = function () {
    function Completion(name, replacementText, glyph, glyphChar) {
      _classCallCheck(this, Completion);

      this.Name = name;
      this.ReplacementText = replacementText;
      this.Glyph = glyph;
      this.GlyphChar = glyphChar;
    }

    _createClass(Completion, [{
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

    return Completion;
  }();

  _fableCore.Util.setInterfaces(Completion.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Completion");

  var SymbolUse = exports.SymbolUse = function () {
    function SymbolUse(fileName, startLine, startColumn, endLine, endColumn, isFromDefinition, isFromAttribute, isFromComputationExpression, isFromDispatchSlotImplementation, isFromPattern, isFromType) {
      _classCallCheck(this, SymbolUse);

      this.FileName = fileName;
      this.StartLine = startLine;
      this.StartColumn = startColumn;
      this.EndLine = endLine;
      this.EndColumn = endColumn;
      this.IsFromDefinition = isFromDefinition;
      this.IsFromAttribute = isFromAttribute;
      this.IsFromComputationExpression = isFromComputationExpression;
      this.IsFromDispatchSlotImplementation = isFromDispatchSlotImplementation;
      this.IsFromPattern = isFromPattern;
      this.IsFromType = isFromType;
    }

    _createClass(SymbolUse, [{
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

    return SymbolUse;
  }();

  _fableCore.Util.setInterfaces(SymbolUse.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.SymbolUse");

  var SymbolUses = exports.SymbolUses = function () {
    function SymbolUses(name, uses) {
      _classCallCheck(this, SymbolUses);

      this.Name = name;
      this.Uses = uses;
    }

    _createClass(SymbolUses, [{
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

    return SymbolUses;
  }();

  _fableCore.Util.setInterfaces(SymbolUses.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.SymbolUses");

  var Helptext = exports.Helptext = function () {
    function Helptext(name, overloads) {
      _classCallCheck(this, Helptext);

      this.Name = name;
      this.Overloads = overloads;
    }

    _createClass(Helptext, [{
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

    return Helptext;
  }();

  _fableCore.Util.setInterfaces(Helptext.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Helptext");

  var OverloadParameter = exports.OverloadParameter = function () {
    function OverloadParameter(name, canonicalTypeTextForSorting, display, description) {
      _classCallCheck(this, OverloadParameter);

      this.Name = name;
      this.CanonicalTypeTextForSorting = canonicalTypeTextForSorting;
      this.Display = display;
      this.Description = description;
    }

    _createClass(OverloadParameter, [{
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

    return OverloadParameter;
  }();

  _fableCore.Util.setInterfaces(OverloadParameter.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.OverloadParameter");

  var Overload = exports.Overload = function () {
    function Overload(tip, typeText, parameters, isStaticArguments) {
      _classCallCheck(this, Overload);

      this.Tip = tip;
      this.TypeText = typeText;
      this.Parameters = parameters;
      this.IsStaticArguments = isStaticArguments;
    }

    _createClass(Overload, [{
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

    return Overload;
  }();

  _fableCore.Util.setInterfaces(Overload.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Overload");

  var Method = exports.Method = function () {
    function Method(name, currentParameter, overloads) {
      _classCallCheck(this, Method);

      this.Name = name;
      this.CurrentParameter = currentParameter;
      this.Overloads = overloads;
    }

    _createClass(Method, [{
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

    return Method;
  }();

  _fableCore.Util.setInterfaces(Method.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Method");

  var CompilerLocation = exports.CompilerLocation = function () {
    function CompilerLocation(fcs, fsi, mSBuild) {
      _classCallCheck(this, CompilerLocation);

      this.Fcs = fcs;
      this.Fsi = fsi;
      this.MSBuild = mSBuild;
    }

    _createClass(CompilerLocation, [{
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

    return CompilerLocation;
  }();

  _fableCore.Util.setInterfaces(CompilerLocation.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.CompilerLocation");

  var _Range = function () {
    function _Range(startColumn, startLine, endColumn, endLine) {
      _classCallCheck(this, _Range);

      this.StartColumn = startColumn;
      this.StartLine = startLine;
      this.EndColumn = endColumn;
      this.EndLine = endLine;
    }

    _createClass(_Range, [{
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

    return _Range;
  }();

  exports.Range = _Range;

  _fableCore.Util.setInterfaces(_Range.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Range");

  var _Symbol = function () {
    function _Symbol(uniqueName, name, glyph, glyphChar, isTopLevel, range, bodyRange) {
      _classCallCheck(this, _Symbol);

      this.UniqueName = uniqueName;
      this.Name = name;
      this.Glyph = glyph;
      this.GlyphChar = glyphChar;
      this.IsTopLevel = isTopLevel;
      this.Range = range;
      this.BodyRange = bodyRange;
    }

    _createClass(_Symbol, [{
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

    return _Symbol;
  }();

  exports.Symbol = _Symbol;

  _fableCore.Util.setInterfaces(_Symbol.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Symbol");

  var Symbols = exports.Symbols = function () {
    function Symbols(declaration, nested) {
      _classCallCheck(this, Symbols);

      this.Declaration = declaration;
      this.Nested = nested;
    }

    _createClass(Symbols, [{
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

    return Symbols;
  }();

  _fableCore.Util.setInterfaces(Symbols.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Symbols");

  var Result = exports.Result = function () {
    function Result(kind, data) {
      _classCallCheck(this, Result);

      this.Kind = kind;
      this.Data = data;
    }

    _createClass(Result, [{
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

    return Result;
  }();

  _fableCore.Util.setInterfaces(Result.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.Web.Result");
});