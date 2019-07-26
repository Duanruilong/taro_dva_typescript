"use strict";

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getReducer;

var _handleActions = _interopRequireDefault(require("./handleActions.js"));

function getReducer(reducers, state, handleActions) {
  // Support reducer enhancer
  // e.g. reducers: [realReducers, enhancer]
  if (Array.isArray(reducers)) {
    return reducers[1]((handleActions || _handleActions.default)(reducers[0], state));
  } else {
    return (handleActions || _handleActions.default)(reducers || {}, state);
  }
}