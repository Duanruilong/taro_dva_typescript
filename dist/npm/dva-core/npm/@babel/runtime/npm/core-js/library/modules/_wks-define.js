var global = require("./_global.js");
var core = require("./_core.js");
var LIBRARY = require("./_library.js");
var wksExt = require("./_wks-ext.js");
var defineProperty = require("./_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};