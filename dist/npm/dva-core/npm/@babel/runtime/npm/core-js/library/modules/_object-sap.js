// most Object methods by ES6 should accept primitives
var $export = require("./_export.js");
var core = require("./_core.js");
var fails = require("./_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};