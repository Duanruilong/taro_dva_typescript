/** 
 * 添加taro等自定义类型
*/

import Taro,{ Component } from '@tarojs/taro'

// 在Component上定义自定义方法类型
declare module '@tarojs/taro' {
    interface Component {
        $api: any
    }
}

// 声明
declare let require: any;
declare let dispatch: any