"use strict";

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPromiseMiddleware;

var _slicedToArray2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/slicedToArray.js"));

var _objectSpread2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/objectSpread.js"));

var _promise = _interopRequireDefault(require("../npm/@babel/runtime/core-js/promise.js"));

var _constants = require("./constants.js");

function createPromiseMiddleware(app) {
  return function () {
    return function (next) {
      return function (action) {
        var type = action.type;

        if (isEffect(type)) {
          return new _promise.default(function (resolve, reject) {
            next((0, _objectSpread2.default)({
              __dva_resolve: resolve,
              __dva_reject: reject
            }, action));
          });
        } else {
          return next(action);
        }
      };
    };
  };

  function isEffect(type) {
    if (!type || typeof type !== 'string') return false;

    var _type$split = type.split(_constants.NAMESPACE_SEP),
        _type$split2 = (0, _slicedToArray2.default)(_type$split, 1),
        namespace = _type$split2[0];

    var model = app._models.filter(function (m) {
      return m.namespace === namespace;
    })[0];

    if (model) {
      if (model.effects && model.effects[type]) {
        return true;
      }
    }

    return false;
  }
}