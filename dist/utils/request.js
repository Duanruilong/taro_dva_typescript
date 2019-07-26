"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../config/index.js");

var _requestConfig = require("../config/requestConfig.js");

var _tips = require("./tips.js");

var _tips2 = _interopRequireDefault(_tips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = exports.Request = function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, null, [{
    key: "conbineOptions",

    // 开始处理options
    value: function conbineOptions(opts, data, method) {
      typeof opts === 'string' && (opts = { url: opts });
      return {
        data: _extends({}, _requestConfig.commonParame, opts.data, data),
        method: opts.method || data.method || method || 'GET',
        url: "" + (opts.host || _index3.MAINHOST) + opts.url
      };
    }
  }, {
    key: "getToken",
    value: function getToken() {
      !this.token && (this.token = _index2.default.getStorageSync('token'));
      return this.token;
    }
    // 登陆

  }, {
    key: "login",
    value: function login() {
      if (!this.isLoading) {
        this.loginReadyPromise = this.onLogining();
      }
      return this.loginReadyPromise;
    }
  }, {
    key: "onLogining",
    value: function onLogining() {
      var _this = this;

      this.isLoading = true;
      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var _ref2, code, _ref3, data;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _index2.default.login();

                case 2:
                  _ref2 = _context.sent;
                  code = _ref2.code;
                  _context.next = 6;
                  return _index2.default.request({
                    url: "" + _index3.MAINHOST + _requestConfig.requestConfig.loginUrl,
                    data: { code: code }
                  });

                case 6:
                  _ref3 = _context.sent;
                  data = _ref3.data;

                  if (!(data.code !== 0 || !data.data || !data.data.token)) {
                    _context.next = 11;
                    break;
                  }

                  reject();
                  return _context.abrupt("return");

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * 基于 Taro.request 的 request 请求
     *
     * */

  }, {
    key: "request",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(opts) {
        var res, edata;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _index2.default.request(opts);

              case 2:
                res = _context2.sent;

                if (!_index3.ISMOCK) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.data);

              case 5:
                if (!(res.data.code === 99999)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return this.login();

              case 8:
                return _context2.abrupt("return", this.request(opts));

              case 9:
                if (!res.data) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", res.data);

              case 11:
                // 请求错误
                edata = _extends({}, res.data, { err: res.data && res.data.msg || '网络错误 ~' });

                _tips2.default.toast(edata.err);
                throw new Error(edata.err);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function request(_x3) {
        return _ref4.apply(this, arguments);
      }

      return request;
    }()
    /**
     * 创建请求函数
    */

  }, {
    key: "creatRequests",
    value: function creatRequests(opts) {
      var _this2 = this;

      console.log('opts==>', opts);
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";

        var _opts, res;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _opts = _this2.conbineOptions(opts, data, method);
                _context3.next = 3;
                return _this2.request(_opts);

              case 3:
                res = _context3.sent;
                return _context3.abrupt("return", res);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));
    }
    /**
     * 抛出API方法
    */

  }, {
    key: "getApiList",
    value: function getApiList(requestConfig) {
      var _this3 = this;

      if (!Object.keys(requestConfig).length) {
        return {};
      }
      Object.keys(requestConfig).forEach(function (key) {
        _this3.apiLists[key] = _this3.creatRequests(requestConfig[key]);
      });
      return this.apiLists;
    }
  }]);

  return Request;
}();
// 登陆时的promise


Request.loginReadyPromise = Promise.resolve();
// 正在登陆
Request.isLoading = false;
// 导出的API对象
Request.apiLists = {};
// token
Request.token = '';
var Api = Request.getApiList(_requestConfig.requestConfig);
_index.Component.prototype.$api = Api;
exports.default = Api;