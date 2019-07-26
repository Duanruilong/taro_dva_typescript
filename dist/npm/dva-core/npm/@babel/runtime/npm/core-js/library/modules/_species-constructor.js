// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require("./_an-object.js");
var aFunction = require("./_a-function.js");
var SPECIES = require("./_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};