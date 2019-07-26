"use strict";

var _interopRequireWildcard = require("../npm/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = require("../npm/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSaga;

var _getIterator2 = _interopRequireDefault(require("../npm/@babel/runtime/core-js/get-iterator.js"));

var _objectSpread2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/objectSpread.js"));

var _toConsumableArray2 = _interopRequireDefault(require("../npm/@babel/runtime/helpers/toConsumableArray.js"));

var _regenerator = _interopRequireDefault(require("../npm/@babel/runtime/regenerator/index.js"));

var _invariant = _interopRequireDefault(require("../npm/invariant/invariant.js"));

var sagaEffects = _interopRequireWildcard(require("../npm/redux-saga/lib/effects.js"));

var _warning = _interopRequireDefault(require("../npm/warning/warning.js"));

var _sagaHelpers = require("../npm/redux-saga/lib/internal/sagaHelpers/index.js");

var _constants = require("./constants.js");

var _prefixType = _interopRequireDefault(require("./prefixType.js"));

function getSaga(effects, model, onError, onEffect) {
  return (
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var key;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = _regenerator.default.keys(effects);

            case 1:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 7;
                break;
              }

              key = _context3.t1.value;

              if (!Object.prototype.hasOwnProperty.call(effects, key)) {
                _context3.next = 5;
                break;
              }

              return _context3.delegateYield(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2() {
                var watcher, task;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        watcher = getWatcher(key, effects[key], model, onError, onEffect);
                        _context2.next = 3;
                        return sagaEffects.fork(watcher);

                      case 3:
                        task = _context2.sent;
                        _context2.next = 6;
                        return sagaEffects.fork(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee() {
                          return _regenerator.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return sagaEffects.take("".concat(model.namespace, "/@@CANCEL_EFFECTS"));

                                case 2:
                                  _context.next = 4;
                                  return sagaEffects.cancel(task);

                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee, this);
                        }));

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              })(), "t2", 5);

            case 5:
              _context3.next = 1;
              break;

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })
  );
}

function getWatcher(key, _effect, model, onError, onEffect) {
  var _marked =
  /*#__PURE__*/
  _regenerator.default.mark(sagaWithCatch);

  var effect = _effect;
  var type = 'takeEvery';
  var ms;

  if (Array.isArray(_effect)) {
    effect = _effect[0];
    var opts = _effect[1];

    if (opts && opts.type) {
      type = opts.type;

      if (type === 'throttle') {
        (0, _invariant.default)(opts.ms, 'app.start: opts.ms should be defined if type is throttle');
        ms = opts.ms;
      }
    }

    (0, _invariant.default)(['watcher', 'takeEvery', 'takeLatest', 'throttle'].indexOf(type) > -1, 'app.start: effect type should be takeEvery, takeLatest, throttle or watcher');
  }

  function noop() {}

  function sagaWithCatch() {
    var _len,
        args,
        _key,
        _ref,
        _ref$__dva_resolve,
        resolve,
        _ref$__dva_reject,
        reject,
        ret,
        _args4 = arguments;

    return _regenerator.default.wrap(function sagaWithCatch$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (_len = _args4.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args4[_key];
            }

            _ref = args.length > 0 ? args[0] : {}, _ref$__dva_resolve = _ref.__dva_resolve, resolve = _ref$__dva_resolve === undefined ? noop : _ref$__dva_resolve, _ref$__dva_reject = _ref.__dva_reject, reject = _ref$__dva_reject === undefined ? noop : _ref$__dva_reject;
            _context4.prev = 2;
            _context4.next = 5;
            return sagaEffects.put({
              type: "".concat(key).concat(_constants.NAMESPACE_SEP, "@@start")
            });

          case 5:
            _context4.next = 7;
            return effect.apply(undefined, (0, _toConsumableArray2.default)(args.concat(createEffects(model))));

          case 7:
            ret = _context4.sent;
            _context4.next = 10;
            return sagaEffects.put({
              type: "".concat(key).concat(_constants.NAMESPACE_SEP, "@@end")
            });

          case 10:
            resolve(ret);
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);
            onError(_context4.t0, {
              key: key,
              effectArgs: args
            });

            if (!_context4.t0._dontReject) {
              reject(_context4.t0);
            }

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _marked, this, [[2, 13]]);
  }

  var sagaWithOnEffect = applyOnEffect(onEffect, sagaWithCatch, model, key);

  switch (type) {
    case 'watcher':
      return sagaWithCatch;

    case 'takeLatest':
      return (
        /*#__PURE__*/
        _regenerator.default.mark(function _callee4() {
          return _regenerator.default.wrap(function _callee4$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return (0, _sagaHelpers.takeLatestHelper)(key, sagaWithOnEffect);

                case 2:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee4, this);
        })
      );

    case 'throttle':
      return (
        /*#__PURE__*/
        _regenerator.default.mark(function _callee5() {
          return _regenerator.default.wrap(function _callee5$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return (0, _sagaHelpers.throttleHelper)(ms, key, sagaWithOnEffect);

                case 2:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee5, this);
        })
      );

    default:
      return (
        /*#__PURE__*/
        _regenerator.default.mark(function _callee6() {
          return _regenerator.default.wrap(function _callee6$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return (0, _sagaHelpers.takeEveryHelper)(key, sagaWithOnEffect);

                case 2:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee6, this);
        })
      );
  }
}

function createEffects(model) {
  function assertAction(type, name) {
    (0, _invariant.default)(type, 'dispatch: action should be a plain Object with type');
    (0, _warning.default)(type.indexOf("".concat(model.namespace).concat(_constants.NAMESPACE_SEP)) !== 0, "[".concat(name, "] ").concat(type, " should not be prefixed with namespace ").concat(model.namespace));
  }

  function put(action) {
    var type = action.type;
    assertAction(type, 'sagaEffects.put');
    return sagaEffects.put((0, _objectSpread2.default)({}, action, {
      type: (0, _prefixType.default)(type, model)
    }));
  } // The operator `put` doesn't block waiting the returned promise to resolve.
  // Using `put.resolve` will wait until the promsie resolve/reject before resuming.
  // It will be helpful to organize multi-effects in order,
  // and increase the reusability by seperate the effect in stand-alone pieces.
  // https://github.com/redux-saga/redux-saga/issues/336


  function putResolve(action) {
    var type = action.type;
    assertAction(type, 'sagaEffects.put.resolve');
    return sagaEffects.put.resolve((0, _objectSpread2.default)({}, action, {
      type: (0, _prefixType.default)(type, model)
    }));
  }

  put.resolve = putResolve;

  function take(type) {
    if (typeof type === 'string') {
      assertAction(type, 'sagaEffects.take');
      return sagaEffects.take((0, _prefixType.default)(type, model));
    } else if (Array.isArray(type)) {
      return sagaEffects.take(type.map(function (t) {
        if (typeof t === 'string') {
          assertAction(t, 'sagaEffects.take');
          return (0, _prefixType.default)(t, model);
        }

        return t;
      }));
    } else {
      return sagaEffects.take(type);
    }
  }

  return (0, _objectSpread2.default)({}, sagaEffects, {
    put: put,
    take: take
  });
}

function applyOnEffect(fns, effect, model, key) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator2.default)(fns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fn = _step.value;
      effect = fn(effect, sagaEffects, model, key);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return effect;
}