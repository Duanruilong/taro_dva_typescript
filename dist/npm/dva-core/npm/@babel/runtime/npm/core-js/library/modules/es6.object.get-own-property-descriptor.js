// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require("./_to-iobject.js");
var $getOwnPropertyDescriptor = require("./_object-gopd.js").f;

require("./_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});