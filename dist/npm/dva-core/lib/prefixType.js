"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixType;

var _constants = require("./constants.js");

function prefixType(type, model) {
  var prefixedType = "".concat(model.namespace).concat(_constants.NAMESPACE_SEP).concat(type);
  var typeWithoutAffix = prefixedType.replace(/\/@@[^/]+?$/, '');

  if (model.reducers && model.reducers[typeWithoutAffix] || model.effects && model.effects[typeWithoutAffix]) {
    return prefixedType;
  }

  return type;
}