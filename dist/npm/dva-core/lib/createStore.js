"use strict";

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _toConsumableArray2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/toConsumableArray.js"));

var _typeof2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/typeof.js"));

var _redux = require("../npm/redux/lib/index.js");

var _flatten = _interopRequireDefault(require("../npm/flatten/index.js"));

var _invariant = _interopRequireDefault(require("../npm/invariant/invariant.js"));

var _window = _interopRequireDefault(require("../npm/global/window.js"));

var _utils = require("./utils.js");

function _default(_ref) {
  var reducers = _ref.reducers,
      initialState = _ref.initialState,
      plugin = _ref.plugin,
      sagaMiddleware = _ref.sagaMiddleware,
      promiseMiddleware = _ref.promiseMiddleware,
      _ref$createOpts$setup = _ref.createOpts.setupMiddlewares,
      setupMiddlewares = _ref$createOpts$setup === undefined ? _utils.returnSelf : _ref$createOpts$setup;
  // extra enhancers
  var extraEnhancers = plugin.get('extraEnhancers');
  (0, _invariant.default)((0, _utils.isArray)(extraEnhancers), "[app.start] extraEnhancers should be array, but got ".concat((0, _typeof2.default)(extraEnhancers)));
  var extraMiddlewares = plugin.get('onAction');
  var middlewares = setupMiddlewares([promiseMiddleware, sagaMiddleware].concat((0, _toConsumableArray2.default)((0, _flatten.default)(extraMiddlewares))));

  var devtools = function devtools() {
    return function (noop) {
      return noop;
    };
  };

  if (_window.default.__REDUX_DEVTOOLS_EXTENSION__) {
    devtools = _window.default.__REDUX_DEVTOOLS_EXTENSION__;
  }

  var enhancers = [_redux.applyMiddleware.apply(undefined, (0, _toConsumableArray2.default)(middlewares))].concat((0, _toConsumableArray2.default)(extraEnhancers), [devtools(_window.default.__REDUX_DEVTOOLS_EXTENSION__OPTIONS)]);
  return (0, _redux.createStore)(reducers, initialState, _redux.compose.apply(undefined, (0, _toConsumableArray2.default)(enhancers)));
}