"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestConfig = exports.commonParame = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require("../pages/index/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index的接口
/**
 * 请求公共参数
*/
var commonParame = exports.commonParame = {};
/**
 * 请求的映射文件
*/
var requestConfig = exports.requestConfig = _extends({
  loginUrl: '/api/user/wechat-auth'
}, _config2.default);