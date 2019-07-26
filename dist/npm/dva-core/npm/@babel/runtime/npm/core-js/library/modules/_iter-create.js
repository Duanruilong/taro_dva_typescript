'use strict';

var create = require("./_object-create.js");
var descriptor = require("./_property-desc.js");
var setToStringTag = require("./_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require("./_hide.js")(IteratorPrototype, require("./_wks.js")('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};