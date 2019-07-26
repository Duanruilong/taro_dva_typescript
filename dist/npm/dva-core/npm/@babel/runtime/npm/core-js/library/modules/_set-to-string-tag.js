var def = require("./_object-dp.js").f;
var has = require("./_has.js");
var TAG = require("./_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};