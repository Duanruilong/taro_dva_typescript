'use strict';

var global = require("./_global.js");
var core = require("./_core.js");
var dP = require("./_object-dp.js");
var DESCRIPTORS = require("./_descriptors.js");
var SPECIES = require("./_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () {
      return this;
    }
  });
};