var global = require("./_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';