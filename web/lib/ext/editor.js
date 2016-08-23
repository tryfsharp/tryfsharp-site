define(["exports", "./utils", "./services", "./fsi", "monaco", "fable-core"], function (exports, _utils, _services, _fsi, _monaco, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createEditor = createEditor;

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

  _monaco = monaco;

  if (_utils.LogHelpers.isLocalHost()) {
    (0, _services.registerServices)("http://localhost:7101");
    (0, _fsi.registerService)("http://localhost:7102");
  } else {
    (0, _services.registerServices)("http://tryfsharp-autocomplete.azurewebsites.net");
    (0, _fsi.registerService)("http://tryfsharp-fable-compiler.azurewebsites.net");
  }

  function createEditor(id, customize) {
    var _ref;

    var options = {};
    options.language = "fsharp";
    options.value = "printfn \"Hello world\"";

    if (customize != null) {
      customize(options);
    }

    var dom = document.getElementById(id);
    var services = {};

    var ed = _monaco.editor.create(dom, options, services);

    var fsi = (0, _fsi.createInteractiveService)(ed);
    var md = ed.getModel();
    md.onDidChangeContent(function (k) {
      (0, _services.parseEditor)(md);
    });
    return _ref = {}, _defineProperty(_ref, _fableCore.Symbol.interfaces, ["Editor.IEditorWrapper"]), _defineProperty(_ref, "getEditor", function getEditor() {
      return ed;
    }), _defineProperty(_ref, "appendCode", function appendCode(code) {
      var model = ed.getModel();

      var value = _fableCore.String.trim(model.getValue(), "end");

      model.setValue(value === "" ? code : value + "\n\n" + code);
    }), _defineProperty(_ref, "setTestCode", function setTestCode(code, callback) {
      fsi.SetTestCode(code, callback);
    }), _ref;
  }
});