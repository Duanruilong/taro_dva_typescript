var anObject = require("./_an-object.js");
var get = require("./core.get-iterator-method.js");
module.exports = require("./_core.js").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};