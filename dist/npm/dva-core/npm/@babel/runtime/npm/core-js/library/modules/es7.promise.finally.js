// https://github.com/tc39/proposal-promise-finally
'use strict';

var $export = require("./_export.js");
var core = require("./_core.js");
var global = require("./_global.js");
var speciesConstructor = require("./_species-constructor.js");
var promiseResolve = require("./_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  } });