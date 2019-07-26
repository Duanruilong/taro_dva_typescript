"use strict";

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkModel;

var _keys = _interopRequireDefault(require("../npm/@babel/runtime/core-js/object/keys.js"));

var _typeof2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/typeof.js"));

var _invariant = _interopRequireDefault(require("../npm/invariant/invariant.js"));

var _utils = require("./utils.js");

function checkModel(model, existModels) {
  var namespace = model.namespace,
      reducers = model.reducers,
      effects = model.effects,
      subscriptions = model.subscriptions; // namespace 必须被定义

  (0, _invariant.default)(namespace, "[app.model] namespace should be defined"); // 并且是字符串

  (0, _invariant.default)(typeof namespace === 'string', "[app.model] namespace should be string, but got ".concat((0, _typeof2.default)(namespace))); // 并且唯一

  (0, _invariant.default)(!existModels.some(function (model) {
    return model.namespace === namespace;
  }), "[app.model] namespace should be unique"); // state 可以为任意值
  // reducers 可以为空，PlainObject 或者数组

  if (reducers) {
    (0, _invariant.default)((0, _utils.isPlainObject)(reducers) || (0, _utils.isArray)(reducers), "[app.model] reducers should be plain object or array, but got ".concat((0, _typeof2.default)(reducers))); // 数组的 reducers 必须是 [Object, Function] 的格式

    (0, _invariant.default)(!(0, _utils.isArray)(reducers) || (0, _utils.isPlainObject)(reducers[0]) && (0, _utils.isFunction)(reducers[1]), "[app.model] reducers with array should be [Object, Function]");
  } // effects 可以为空，PlainObject


  if (effects) {
    (0, _invariant.default)((0, _utils.isPlainObject)(effects), "[app.model] effects should be plain object, but got ".concat((0, _typeof2.default)(effects)));
  }

  if (subscriptions) {
    // subscriptions 可以为空，PlainObject
    (0, _invariant.default)((0, _utils.isPlainObject)(subscriptions), "[app.model] subscriptions should be plain object, but got ".concat((0, _typeof2.default)(subscriptions))); // subscription 必须为函数

    (0, _invariant.default)(isAllFunction(subscriptions), "[app.model] subscription should be function");
  }
}

function isAllFunction(obj) {
  return (0, _keys.default)(obj).every(function (key) {
    return (0, _utils.isFunction)(obj[key]);
  });
}