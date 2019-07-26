var pIE = require("./_object-pie.js");
var createDesc = require("./_property-desc.js");
var toIObject = require("./_to-iobject.js");
var toPrimitive = require("./_to-primitive.js");
var has = require("./_has.js");
var IE8_DOM_DEFINE = require("./_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require("./_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};