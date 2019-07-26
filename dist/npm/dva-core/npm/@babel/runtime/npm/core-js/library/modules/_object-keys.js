// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require("./_object-keys-internal.js");
var enumBugKeys = require("./_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};