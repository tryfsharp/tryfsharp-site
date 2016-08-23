define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PromiseBuilderImp = exports.PromiseBuilder = exports.Promise = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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
});