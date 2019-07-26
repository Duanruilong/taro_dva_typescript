'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var SHOW = '@@DVA_LOADING/SHOW';
var HIDE = '@@DVA_LOADING/HIDE';
var NAMESPACE = 'loading';

function createLoading() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var namespace = opts.namespace || NAMESPACE;
  var _opts$only = opts.only,
      only = _opts$only === undefined ? [] : _opts$only,
      _opts$except = opts.except,
      except = _opts$except === undefined ? [] : _opts$except;

  if (only.length > 0 && except.length > 0) {
    throw Error('It is ambiguous to configurate `only` and `except` items at the same time.');
  }

  var initialState = {
    global: false,
    models: {},
    effects: {}
  };

  var extraReducers = _defineProperty({}, namespace, function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        payload = _ref.payload;

    var _ref2 = payload || {},
        namespace = _ref2.namespace,
        actionType = _ref2.actionType;

    var ret;

    switch (type) {
      case SHOW:
        ret = _objectSpread({}, state, {
          global: true,
          models: _objectSpread({}, state.models, _defineProperty({}, namespace, true)),
          effects: _objectSpread({}, state.effects, _defineProperty({}, actionType, true))
        });
        break;

      case HIDE:
        {
          var effects = _objectSpread({}, state.effects, _defineProperty({}, actionType, false));

          var models = _objectSpread({}, state.models, _defineProperty({}, namespace, Object.keys(effects).some(function (actionType) {
            var _namespace = actionType.split('/')[0];
            if (_namespace !== namespace) return false;
            return effects[actionType];
          })));

          var global = Object.keys(models).some(function (namespace) {
            return models[namespace];
          });
          ret = _objectSpread({}, state, {
            global: global,
            models: models,
            effects: effects
          });
          break;
        }

      default:
        ret = state;
        break;
    }

    return ret;
  });

  function onEffect(effect, _ref3, model, actionType) {
    var put = _ref3.put;
    var namespace = model.namespace;

    if (only.length === 0 && except.length === 0 || only.length > 0 && only.indexOf(actionType) !== -1 || except.length > 0 && except.indexOf(actionType) === -1) {
      return (
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return put({
                    type: SHOW,
                    payload: {
                      namespace: namespace,
                      actionType: actionType
                    }
                  });

                case 2:
                  _context.next = 4;
                  return effect.apply(undefined, _args);

                case 4:
                  _context.next = 6;
                  return put({
                    type: HIDE,
                    payload: {
                      namespace: namespace,
                      actionType: actionType
                    }
                  });

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })
      );
    } else {
      return effect;
    }
  }

  return {
    extraReducers: extraReducers,
    onEffect: onEffect
  };
}

module.exports = createLoading;