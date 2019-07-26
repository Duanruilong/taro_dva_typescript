// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require("./_iobject.js");
var defined = require("./_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};