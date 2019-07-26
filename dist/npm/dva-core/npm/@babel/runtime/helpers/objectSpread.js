var _Object$getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor.js");

var _Object$getOwnPropertySymbols = require("../core-js/object/get-own-property-symbols.js");

var _Object$keys = require("../core-js/object/keys.js");

var defineProperty = require("./defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _Object$keys(source);

    if (typeof _Object$getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(_Object$getOwnPropertySymbols(source).filter(function (sym) {
        return _Object$getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;