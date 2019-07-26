"use strict";

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixedDispatch;

var _objectSpread2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/objectSpread.js"));

var _invariant = _interopRequireDefault(require("../npm/invariant/invariant.js"));

var _warning = _interopRequireDefault(require("../npm/warning/warning.js"));

var _constants = require("./constants.js");

var _prefixType = _interopRequireDefault(require("./prefixType.js"));

function prefixedDispatch(dispatch, model) {
  return function (action) {
    var type = action.type;
    (0, _invariant.default)(type, 'dispatch: action should be a plain Object with type');
    (0, _warning.default)(type.indexOf("".concat(model.namespace).concat(_constants.NAMESPACE_SEP)) !== 0, "dispatch: ".concat(type, " should not be prefixed with namespace ").concat(model.namespace));
    return dispatch((0, _objectSpread2.default)({}, action, {
      type: (0, _prefixType.default)(type, model)
    }));
  };
}