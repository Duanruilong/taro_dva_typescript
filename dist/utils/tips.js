'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 整合封装微信的原生弹窗
 * 提示、加载、工具类
*/
var Tips = function () {
  function Tips() {
    _classCallCheck(this, Tips);
  }

  _createClass(Tips, null, [{
    key: 'toast',

    /**
     * 提示信息
    */
    value: function toast(title, onHide) {
      _index2.default.showToast({
        title: title,
        icon: 'node',
        mask: true,
        duration: 1500
      });
      // 去除结束回调函数
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }
    /**
     * 加载提示弹窗
    */

  }, {
    key: 'loding',
    value: function loding(title) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.isLoading && !force) {
        return;
      }
      this.isLoading = true;
      if (_index2.default.showLoading) {
        _index2.default.showLoading({
          title: title,
          mask: true
        });
      } else {
        _index2.default.showNavigationBarLoading(); //导航条加载动画
      }
    }
    /**
     * 加载完成
    */

  }, {
    key: 'loaded',
    value: function loaded() {
      var duration = 0;
      if (this.isLoading) {
        this.isLoading = false;
        if (_index2.default.hideLoading) {
          _index2.default.hideLoading();
        } else {
          _index2.default.hideNavigationBarLoading(); //导航条加载动画
        }
        duration = 500;
      }
      // 设定隐藏的动画时长为500ms,防止直接toast时出现问题
      return new Promise(function (resolve) {
        return setTimeout(resolve, duration);
      });
    }
    /**
     * 弹出提示框
    */

  }, {
    key: 'success',
    value: function success(title) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

      _index2.default.showToast({
        title: title,
        icon: 'success',
        duration: duration,
        mask: true
      });
      if (duration > 0) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, duration);
        });
      }
    }
  }]);

  return Tips;
}();

exports.default = Tips;

Tips.isLoading = false;