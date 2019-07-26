'use strict';
// https://github.com/tc39/proposal-promise-try

var $export = require("./_export.js");
var newPromiseCapability = require("./_new-promise-capability.js");
var perform = require("./_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
    var promiseCapability = newPromiseCapability.f(this);
    var result = perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });