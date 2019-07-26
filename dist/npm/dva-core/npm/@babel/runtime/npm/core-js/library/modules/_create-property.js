'use strict';

var $defineProperty = require("./_object-dp.js");
var createDesc = require("./_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};