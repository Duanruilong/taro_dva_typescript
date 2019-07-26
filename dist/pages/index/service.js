"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getList = undefined;

var _request = require("../../utils/request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getList = exports.getList = function getList(data) {
  return _request2.default.getList(data);
};