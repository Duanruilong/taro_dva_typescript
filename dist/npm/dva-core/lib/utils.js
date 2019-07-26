"use strict";

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isPlainObject", {
  enumerable: true,
  get: function get() {
    return _isPlainObject2.default;
  }
});
exports.findIndex = exports.noop = exports.returnSelf = exports.isFunction = exports.isArray = undefined;

var _isPlainObject2 = _interopRequireDefault(require("../npm/is-plain-object/index.js"));

var isArray = Array.isArray.bind(Array);
exports.isArray = isArray;

var isFunction = function isFunction(o) {
  return typeof o === 'function';
};

exports.isFunction = isFunction;

var returnSelf = function returnSelf(m) {
  return m;
}; // avoid es6 array.prototype.findIndex polyfill


exports.returnSelf = returnSelf;

var noop = function noop() {};

exports.noop = noop;

var findIndex = function findIndex(array, predicate) {
  for (var i = 0, length = array.length; i < length; i++) {
    if (predicate(array[i], i)) return i;
  }

  return -1;
};

exports.findIndex = findIndex;