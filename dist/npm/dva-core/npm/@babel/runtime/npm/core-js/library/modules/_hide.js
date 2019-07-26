var dP = require("./_object-dp.js");
var createDesc = require("./_property-desc.js");
module.exports = require("./_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};