var classof = require("./_classof.js");
var ITERATOR = require("./_wks.js")('iterator');
var Iterators = require("./_iterators.js");
module.exports = require("./_core.js").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined || '@@iterator' in O
  // eslint-disable-next-line no-prototype-builtins
  || Iterators.hasOwnProperty(classof(O));
};