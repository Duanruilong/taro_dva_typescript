"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../npm/dva-core/index.js");

var _reduxLogger = require("../npm/redux-logger/dist/redux-logger.js");

var _index2 = require("../npm/dva-loading/dist/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = void 0;
var store = void 0;
var dispatch = void 0;
var registered = void 0;
function createApp(opt) {
  // redux 的日志
  opt.onAction = [(0, _reduxLogger.createLogger)()];
  app = (0, _index.create)(opt);
  app.use((0, _index3.default)({}));
  if (!registered) {
    opt.models.forEach(function (model) {
      return app.model(model);
    });
  }
  registered = true;
  app.start();
  store = app._store;
  app.getStore = function () {
    return store;
  };
  app.use({
    onError: function onError(err) {
      console.log(err);
    }
  });
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}
exports.default = {
  createApp: createApp,
  getDispatch: function getDispatch() {
    return app.dispatch;
  }
};