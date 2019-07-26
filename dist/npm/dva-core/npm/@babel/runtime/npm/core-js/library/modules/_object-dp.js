var anObject = require("./_an-object.js");
var IE8_DOM_DEFINE = require("./_ie8-dom-define.js");
var toPrimitive = require("./_to-primitive.js");
var dP = Object.defineProperty;

exports.f = require("./_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};