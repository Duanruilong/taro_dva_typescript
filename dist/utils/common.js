'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 共用函数
*/
var repeat = exports.repeat = function repeat() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
  var times = arguments[1];
  return new Array(times + 1).join(str);
};
// 时间前面 +0 
var pad = exports.pad = function pad(num) {
  var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return repeat('0', maxLength - num.toString().length) + num;
};
// 全局的公共变量
var globalData = exports.globalData = {};
// 时间格式装换函数
var formatTime = exports.formatTime = function formatTime(time) {
  pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds()) + '.' + pad(time.getMilliseconds(), 3);
};