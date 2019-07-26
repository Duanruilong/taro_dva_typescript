// check on default Array iterator
var Iterators = require("./_iterators.js");
var ITERATOR = require("./_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};