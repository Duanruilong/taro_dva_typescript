'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 这里为了方便测试使用 Easy Mock 模拟接口数据
 *
 * https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad/getlist
*/
var ONLINEHOST = exports.ONLINEHOST = 'https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad';
/**
 * mock 接口
 * */
var MOCKHOST = exports.MOCKHOST = 'https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad';
/**
 * 是否mock
*/
var ISMOCK = exports.ISMOCK = true;
/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
var MAINHOST = exports.MAINHOST = ONLINEHOST;
/**
 * 这是一个全局的分享信息 不用每一个都去写
 */
var SHAREINFO = exports.SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
};