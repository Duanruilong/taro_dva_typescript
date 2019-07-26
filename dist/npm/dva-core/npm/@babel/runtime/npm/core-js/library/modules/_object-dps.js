var dP = require("./_object-dp.js");
var anObject = require("./_an-object.js");
var getKeys = require("./_object-keys.js");

module.exports = require("./_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};