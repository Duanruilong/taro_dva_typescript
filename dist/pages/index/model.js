'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // import Taro from '@tarojs/taro';


var _service = require('./service.js');

var indexApi = _interopRequireWildcard(_service);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  namespace: 'index',
  state: {
    data: [],
    v: '1.0',
    key: '72eed010c976e448971655b56fc2324e'
  },
  effects: {
    getList: /*#__PURE__*/regeneratorRuntime.mark(function getList(_ref, _ref2) {
      var payload = _ref.payload;
      var select = _ref2.select,
          call = _ref2.call,
          put = _ref2.put;

      var _ref3, error, result;

      return regeneratorRuntime.wrap(function getList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(indexApi.getList, _extends({}, payload));

            case 2:
              _ref3 = _context.sent;
              error = _ref3.error;
              result = _ref3.result;

              console.log('数据接口返回', result);

              if (error) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return put({
                type: 'save',
                payload: {
                  data: result.data
                }
              });

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, getList, this);
    })
  },
  reducers: {
    save: function save(state, _ref4) {
      var payload = _ref4.payload;

      return _extends({}, state, payload);
    }
  }
};