var shared = require("./_shared.js")('keys');
var uid = require("./_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};