// support for async functions

{
  var g = typeof window !== 'undefined' && window.Math === Math ? window : typeof global === 'object' ? global : this;

  if (!g.Promise) {
    g.Promise = require("./npm/promise-polyfill/lib/index.js");
  }
  if (!g.regeneratorRuntime) {
    g.regeneratorRuntime = require("./npm/regenerator-runtime/runtime.js");
  }
}