import Taro,{ Component } from '@tarojs/taro'
import { SHAREINFO } from '../config/index'



/** 
 * 封装taro小程序的一些方法
 *  - 方法改写
 *  - utils 挂载
*/


// navigateTo 超过8次后，强行进行redirectTo,避免页面卡顿

 const nav = Taro.navigateTo
 Taro.navigateTo = (data) => {
     if (Taro.getCurrentPages().length > 8) {
         return Taro.redirectTo(data)
     }
     return nav(data)
 }


// 挂载分享方法 Component

Component.prototype.onShareAppMessage = function () {
    return SHAREINFO
}
