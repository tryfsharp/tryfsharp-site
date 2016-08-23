define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.worker = exports.languages = exports.editor = exports.SelectionDirection = exports.KeyCode = exports.Severity = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Severity = exports.Severity = function Severity() {
    _classCallCheck(this, Severity);
  };

  _fableCore.Util.setInterfaces(Severity.prototype, [], "Fable.Import.monaco.Severity");

  var KeyCode = exports.KeyCode = function KeyCode() {
    _classCallCheck(this, KeyCode);
  };

  _fableCore.Util.setInterfaces(KeyCode.prototype, [], "Fable.Import.monaco.KeyCode");

  var SelectionDirection = exports.SelectionDirection = function SelectionDirection() {
    _classCallCheck(this, SelectionDirection);
  };

  _fableCore.Util.setInterfaces(SelectionDirection.prototype, [], "Fable.Import.monaco.SelectionDirection");

  var editor = exports.editor = function ($exports) {
    var ScrollbarVisibility = $exports.ScrollbarVisibility = function ScrollbarVisibility() {
      _classCallCheck(this, ScrollbarVisibility);
    };

    _fableCore.Util.setInterfaces(ScrollbarVisibility.prototype, [], "Fable.Import.monaco.editor.ScrollbarVisibility");

    var WrappingIndent = $exports.WrappingIndent = function WrappingIndent() {
      _classCallCheck(this, WrappingIndent);
    };

    _fableCore.Util.setInterfaces(WrappingIndent.prototype, [], "Fable.Import.monaco.editor.WrappingIndent");

    var OverviewRulerLane = $exports.OverviewRulerLane = function OverviewRulerLane() {
      _classCallCheck(this, OverviewRulerLane);
    };

    _fableCore.Util.setInterfaces(OverviewRulerLane.prototype, [], "Fable.Import.monaco.editor.OverviewRulerLane");

    var EndOfLinePreference = $exports.EndOfLinePreference = function EndOfLinePreference() {
      _classCallCheck(this, EndOfLinePreference);
    };

    _fableCore.Util.setInterfaces(EndOfLinePreference.prototype, [], "Fable.Import.monaco.editor.EndOfLinePreference");

    var DefaultEndOfLine = $exports.DefaultEndOfLine = function DefaultEndOfLine() {
      _classCallCheck(this, DefaultEndOfLine);
    };

    _fableCore.Util.setInterfaces(DefaultEndOfLine.prototype, [], "Fable.Import.monaco.editor.DefaultEndOfLine");

    var EndOfLineSequence = $exports.EndOfLineSequence = function EndOfLineSequence() {
      _classCallCheck(this, EndOfLineSequence);
    };

    _fableCore.Util.setInterfaces(EndOfLineSequence.prototype, [], "Fable.Import.monaco.editor.EndOfLineSequence");

    var TrackedRangeStickiness = $exports.TrackedRangeStickiness = function TrackedRangeStickiness() {
      _classCallCheck(this, TrackedRangeStickiness);
    };

    _fableCore.Util.setInterfaces(TrackedRangeStickiness.prototype, [], "Fable.Import.monaco.editor.TrackedRangeStickiness");

    var CursorChangeReason = $exports.CursorChangeReason = function CursorChangeReason() {
      _classCallCheck(this, CursorChangeReason);
    };

    _fableCore.Util.setInterfaces(CursorChangeReason.prototype, [], "Fable.Import.monaco.editor.CursorChangeReason");

    var MouseTargetType = $exports.MouseTargetType = function MouseTargetType() {
      _classCallCheck(this, MouseTargetType);
    };

    _fableCore.Util.setInterfaces(MouseTargetType.prototype, [], "Fable.Import.monaco.editor.MouseTargetType");

    var TextEditorCursorStyle = $exports.TextEditorCursorStyle = function TextEditorCursorStyle() {
      _classCallCheck(this, TextEditorCursorStyle);
    };

    _fableCore.Util.setInterfaces(TextEditorCursorStyle.prototype, [], "Fable.Import.monaco.editor.TextEditorCursorStyle");

    var ContentWidgetPositionPreference = $exports.ContentWidgetPositionPreference = function ContentWidgetPositionPreference() {
      _classCallCheck(this, ContentWidgetPositionPreference);
    };

    _fableCore.Util.setInterfaces(ContentWidgetPositionPreference.prototype, [], "Fable.Import.monaco.editor.ContentWidgetPositionPreference");

    var OverlayWidgetPositionPreference = $exports.OverlayWidgetPositionPreference = function OverlayWidgetPositionPreference() {
      _classCallCheck(this, OverlayWidgetPositionPreference);
    };

    _fableCore.Util.setInterfaces(OverlayWidgetPositionPreference.prototype, [], "Fable.Import.monaco.editor.OverlayWidgetPositionPreference");

    return $exports;
  }({});

  var languages = exports.languages = function ($exports) {
    var CompletionItemKind = $exports.CompletionItemKind = function CompletionItemKind() {
      _classCallCheck(this, CompletionItemKind);
    };

    _fableCore.Util.setInterfaces(CompletionItemKind.prototype, [], "Fable.Import.monaco.languages.CompletionItemKind");

    var DocumentHighlightKind = $exports.DocumentHighlightKind = function DocumentHighlightKind() {
      _classCallCheck(this, DocumentHighlightKind);
    };

    _fableCore.Util.setInterfaces(DocumentHighlightKind.prototype, [], "Fable.Import.monaco.languages.DocumentHighlightKind");

    var SymbolKind = $exports.SymbolKind = function SymbolKind() {
      _classCallCheck(this, SymbolKind);
    };

    _fableCore.Util.setInterfaces(SymbolKind.prototype, [], "Fable.Import.monaco.languages.SymbolKind");

    var IndentAction = $exports.IndentAction = function IndentAction() {
      _classCallCheck(this, IndentAction);
    };

    _fableCore.Util.setInterfaces(IndentAction.prototype, [], "Fable.Import.monaco.languages.IndentAction");

    return $exports;
  }({});

  var worker = exports.worker = function ($exports) {
    return $exports;
  }({});
});