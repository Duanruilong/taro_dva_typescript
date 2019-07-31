# taro_dva_typescript
Taro + dva + Typescript
 架构实例

# 环境配置：
- 安装node
- 安装taro-cli

~~~
npm install -g @tarojs/cli

- update
taro update self
taro update project
~~~

用于主模块基础文件生成
~~~
cd {proj}

pages模版快速生成


 用法：npm run tep `文件名`
~~~

# 项目编译和预览：
- clone项目
- 使用npm或者taro 编译
- 使用对应的开发工具(如：微信开发者工具)，选择编译后的dist文件夹进行预览；或者直接预览(如：H5)

## 微信小程序

~~~
# npm script
$ npm run dev:weapp
$ npm run build:weapp
# 仅限全局安装
$ taro build --type weapp --watch
$ taro build --type weapp
~~~

## H5

~~~
# npm script
$ npm run dev:h5
# 仅限全局安装
$ taro build --type h5 --watch
~~~
  
## 支付宝小程序

~~~
# npm script
$ npm run dev:alipay
$ npm run build:alipay
# 仅限全局安装
$ taro build --type alipay --watch
$ taro build --type alipay
~~~

## React Native

~~~
# npm script
$ npm run dev:rn
# 仅限全局安装
$ taro build --type rn --watch
~~~

详细文档见：  
[Taro-docs](https://nervjs.github.io/taro/docs/README.html)  

[Taro-ui](https://github.com/NervJS/taro-ui)  
 
[f2-canvas](https://github.com/antvis/f2-canvas)

[f2 API文档](https://www.yuque.com/antv/f2/api-index)

***

>项目详细配置如下



微信小程序的开发目前是很热的一个领域，有很多的开发模式，找到一种属于自己的方法才会使得开发顺心顺利。

此架构是使用 Taro + dva + typescript 构建前端开发
- 京东凹凸实验室的React框架Taro很成熟，又是大厂在维护更新迭代，不用担心没人维护的问题，他有自己的UI还有物料社区，比起原生小程序方便很多，支持多端，一处代码，多处运行，微信小程序、H5、百度小程序、支付宝小程序、字节跳动小程序、QQ轻应用、快应用、ReactNative；
- 数据管理是Redux集成的dva框架，是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架；
- TypeScript就是所谓的JavaScript超集。它不是JavaScript的替代品，也不会为JavaScript代码添加任何新功能。相反，TypeScript允许程序员在其代码中使用面向对象的构造，然后将其转换为JavaScript。它还包括类型安全和编译时类型检查等便利功能。



![Taro](https://raw.githubusercontent.com/Duanruilong/phone_drl/master/image/blog/taro.jpg)

<!--more-->

> 资料

[Taro官网地址：https://taro.aotu.io/](https://taro.aotu.io/)
[dva官网地址：https://dvajs.com/guide/](https://dvajs.com/guide/)

# 开始

## 前期工作准备


cli 工具安装:

```h
# 使用 npm 安装 cli
$ npm install -g @tarojs/cli

# OR 使用 yarn 安装 cli
$ yarn global add @tarojs/cli

# OR 安装了 cnpm，使用 cnpm 安装 cli
$ cnpm install -g @tarojs/cli


```

使用命令创建模板项目:

```h

$ taro init Taro_dva_Typescript

```

![Taro](https://raw.githubusercontent.com/Duanruilong/phone_drl/master/image/taro/tdt1.jpg)


## 安装配置文件

安装dva

`cnpm install --save dva-core dva-loading`

- `dva-core`：封装了 redux 和 redux-saga的一个插件
- `dva-loading`：管理页面的loading状态

安装@tarojs/redux

`cnpm install --save redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger`

# 配置项目文件

去除不需要的文件，添加实际需要的一些文件，先删除`./ssrc/page`下的index文件夹，后期使用命令行生成完整结构的文件夹。

在``/src`目录下根据自己的实际需求进行一下配置：

- `assets`: 一些静态资源，比如：image、iconfont
- `config`: 项目配置文件
- `components`: 项目编写的一些共用组件
- `types`: 项目公共的Typescript类型声明
- `models`: 项目dva插件model函数的引用或者是一些共用的js文件
- `utils`: 项目里封装的一些插件

## 项目一些具体配置操作

### 1、在`./src/config`下创建index.ts，添加项目配置信息

```h
/** 
 * 这里为了方便测试使用 Easy Mock 模拟接口数据
 * 
 * https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad/getlist
*/

export const ONLINEHOST = 'https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad/getlist';

/** 
 * mock 接口
 * */ 
export const MOCKHOST = 'https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad/getlist';

/** 
 * 是否mock
*/

export const ISMOCK = true;


/**
 * 这是一个全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
    'title': '分享标题',
    'path': '路径',
    'imageUrl': '图片'
  }


```

### 2、在`./src/utils`下创建dva.ts，配置dva

```h

import { create } from "dva-core";
import { createLogger } from "redux-logger";
import  createLoading  from "dva-loading";



let app
let store
let dispatch
let registered

function createApp(opt) {
    // redux 的日志
    opt.onAction = [createLogger()]
    app = create(opt)
    app.use(createLoading({}))

    if (!registered) {
        opt.models.forEach(model => app.model(model));
    }
    registered = true;
    app.start()

    store = app._store;
    app.getStore = () => store;
    app.use({
        onError(err){
            console.log(err);
        }
    })

    dispatch = store.dispatch;
    app.dispatch = dispatch;
    return app;
}

export default{
    createApp,
    getDispatch(){
        return app.dispatch
    }
}

```

### 3、在`./src/utils`下创建tips.ts，整合封装微信原生弹窗

```h

import Taro from "@tarojs/taro";
import { node } from "_@types_prop-types@15.7.1@@types/prop-types";

/** 
 * 整合封装微信的原生弹窗
 * 提示、加载、工具类
*/

export default class Tips {
	static isLoading = false;

	/** 
	 * 提示信息
	*/
	static toast(title: string, onHide?: () => void) {
		Taro.showToast({
			title: title,
			icon: 'node',
			mask: true,
			duration: 1500
		});
		// 去除结束回调函数
		if (onHide) {
			setTimeout(() => {
				onHide();
			}, 500);
		}
	}

	/** 
	 * 加载提示弹窗
	*/

	static loding(title:'加载中',force = false){
		if (this.isLoading && !force) {
			return
		}

		this.isLoading = true;
		if (Taro.showLoading) {
			Taro.showLoading({
				title:title,
				mask:true
			})
		}else{
			Taro.showNavigationBarLoading() //导航条加载动画
		}
	}

	/** 
	 * 加载完成
	*/
	static loaded(){
		let duration = 0;
		if (this.isLoading) {
			this.isLoading = false;
			if (Taro.hideLoading) {
				Taro.hideLoading()
			} else {
				Taro.hideNavigationBarLoading(); //导航条加载动画
			}
			duration = 500;
		}
		// 设定隐藏的动画时长为500ms,防止直接toast时出现问题
		return new Promise(resolve => setTimeout(resolve,duration))
	}

	/** 
	 * 弹出提示框
	*/

	static success(title,duration = 1500){
		Taro.showToast({
			title: title,
			icon: 'success',
			duration: duration,
			mask:true
		})
		if (duration > 0) {
			return new Promise(resolve => setTimeout(resolve,duration))
		}
	}

}



```

### 4、在`./src/config`下创建requestConfig.ts，统一配置请求接口

```h
/** 
 * 请求公共参数
*/

export const commonParame = {}

/** 
 * 请求的映射文件
*/

export const requestConfig = {
    loginUrl:'/api/user/wechat-auth' // 微信的登陆接口
}


```

### 5、在`./src/utils`下创建common.ts，共用函数

```h

/** 
 * 共用函数
*/

export const repeat = (str = '0', times) => (new Array(times + 1)).join(str);
// 时间前面 +0 
export const pad = (num, maxLength = 2) => repeat('0', maxLength - num.toString().length) + num;

// 全局的公共变量
export let globalData: any = {

}

// 时间格式装换函数

export const formatTime = time => {
    `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`
}

```

### 6、在`./src/utils`下创建logger.ts，封装log函数

```h

/** 
 * 封装logo函数
*/

import { formatTime } from './common';

const defaults = {
	level: 'log',
	logger: console,
	logErrors: true,
	colors: {
		title:'logger',
		req:'#9e9e9e',
		res:'#4caf50',
		error:'#f20404',
	}
}

function printBuffer(logEntry, options){
	const {logger,colors} = options;
	let {title,started,req,res} = logEntry;
	
	// Message
	const headerCSS = ['color:gray; font-weight:lighter;']
	const styles = s => `color ${s}; font-weight: bold`;

	// render
	logger.group(`%c ${title} @${formatTime(started)}`, ...headerCSS);
	logger.log('%c req', styles(colors.req), req)
	logger.log('%c res', styles(colors.res), res)
	logger.groupEnd()

}

interface LogEntry{
	started ? : object  // 触发时间
}

function createLogger(options: LogEntry = {}){
	const loggerOptions = Object.assign({}, defaults, options)
	const logEntry = options
	logEntry.started = new Date();
	printBuffer(logEntry, Object.assign({}, loggerOptions))
}

export {
	defaults,
	createLogger,
}

```

### 7、在`./src/utils`下创建request.ts，封装http请求

```h

import Taro,{ Component } from "@tarojs/taro";
import { ISMOCK,MAINHOST } from "../config";
import { commonParame,requestConfig } from "../config/requestConfig";
import Tips from "./tips";


// 封装请求


declare type Methohs = "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
declare type Headers = { [key :string]:string};
declare type Datas = {method : Methohs; [key: string] : any;};
interface Options{
    url: string;
    host?: string;
    method?: Methohs;
    data?: Datas;
    header?: Headers;
}

export class Request {
    // 登陆时的promise
    static loginReadyPromise: Promise<any> = Promise.resolve()

    // 正在登陆
    static isLoading: boolean = false

    // 导出的API对象
    static apiLists: { [key: string]: () => any;} = {}

    // token
    static token: string = ''

    // 开始处理options
    static conbineOptions(opts, data: Datas, method: Methohs): Options {
        typeof opts ===  'string' && (opts = {url: opts})
        return {
            data: { ...commonParame, ...opts.data, ...data },
            method: opts.method || data.method || method || 'GET',
            url: `${opts.host || MAINHOST}${opts.url}`
        }
    }

    static getToken(){
        !this.token && (this.token = Taro.getStorageSync('token'))
        return this.token
    }


    // 登陆
    static login(){
        if (!this.isLoading) {
            this.loginReadyPromise = this.onLogining()
        }
        return this.loginReadyPromise
    }

    static onLogining(){
        this.isLoading = true;
        return new Promise(async (resolve, reject) => {
            // 获取code
            const { code } = await Taro.login();

            const { data } = await Taro.request({
                url: `${MAINHOST}${requestConfig.loginUrl}`,
                data:{code: code}
            })

            if (data.code !== 0 || !data.data || !data.data.token) {
                reject()
                return
            }
        })

    }

    /** 
     * 基于 Taro.request 的 request 请求
     * 
     * */ 
    static async request(opts: Options) {
        
        // Taro.request 请求
        const res = await Taro.request(opts);

        // 是否mock
        if(ISMOCK) return res.data;

        // 请求失败
        if (res.data.code === 99999) {
            await this.login();
            return this.request(opts)
        }

        // 请求成功
        if (res.data) {
            return res.data
        }

        // 请求错误
        const edata = { ...res.data, err : (res.data && res.data.msg) || '网络错误 ~'}
        Tips.toast(edata.err)
        throw new Error(edata.err)

    }


    /** 
     * 创建请求函数
    */
   static creatRequests(opts: Options | string) : () => {} {
       console.log('opts==>',opts);
       return async (data={}, method: Methods = "GET") => {
           const _opts = this.conbineOptions(opts, data, method)
           const res = await this.request(_opts)
            return res;
        }
   }

   /** 
    * 抛出API方法
   */

   static getApiList(requestConfig){
        if (!Object.keys(requestConfig).length) {
            return {}
        }
        Object.keys(requestConfig).forEach((key)=>{
            this.apiLists[key] = this.creatRequests(requestConfig[key])
        })
        return this.apiLists
   }


}

const Api = Request.getApiList(requestConfig)
Component.prototype.$api = Api
export default Api as any


```

> 注：

在这里tslint会报这样的错：`类型“Component<any, any>”上不存在属性“$api”`。，因为没有添加声明，需在./src目录下创建`app-shim.d.ts`


```h

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

```

### 8、在`./src/config`下创建taroConfig.ts，封装taro小程序的一些方法

```h
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


```























## 配置文件生成脚本

### 1、在根目录下创建scripts文件夹，添加`./scripts/template.js`


```h

/** 
 *  pages 页面快速生成脚本
 *  
 *  npm run tem '文件名‘
*/

const fs = require('fs')
const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);

if (!dirName) {
    console.log('文件名不能为空');
    console.log('用法：npm run tem test');
    process.exit(0);
}

// 页面模板构建

const indexTep = `
    import Taro, { Component, Config } from '@tarojs/taro'
    import { View } from '@tarojs/components'
    // import { connect } from '@tarojs/redux'
    // import Api from '../../utils/request'
    // import Tips from '../../utils/tips'
    import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
    import './${dirName}.scss'
    // import {  } from '../../components'

    // @connect(({ ${dirName} }) => ({
    //     ...${dirName},
    // }))

    class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
    config:Config = {
        navigationBarTitleText: '页面标题'
    }
    constructor(props: ${capPirName}Props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        
    }

    render() {
        return (
        <View className='fx-${dirName}-wrap'>
            页面内容
        </View>
        )
    }
    }
    export default ${capPirName}
`

// scss 文件模板

const scssTep = `
    @import "../../assets/scss/variables";
    .#{$prefix} {
        &-${dirName}-wrap {
            width: 100%;
            min-height: 100Vh;
        }
    }
`

// config 接口地址配置模板

const configTep =`
    export default {
        test:'/wechat/perfect-info',  //XX接口
    }
`

// 接口请求模板

const serviceTep =`
    import Api from '../../utils/request'
    export const testApi = data => Api.test(
        data
    )
`

// model 模板

const modelTep = `
    // import Taro from '@tarojs/taro';
    // import * as ${dirName}Api from './service';
    export default {
        namespace: '${dirName}',
        state: {
        },
        
        effects: {},
        
        reducers: {}
    
    }

`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('config.ts', configTep); // config
fs.writeFileSync('service.ts', serviceTep); // service
fs.writeFileSync('model.ts', modelTep); // model
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);



```


> 最后

在根目录的`package.json`的scripts里加上对应的命令


```h

"scripts": {
  ...
  "tep": "node scripts/template",
  "com": "node scripts/component"
}

```

### 2、自动生成脚本文件夹


`cnpm run tep index`


page文件夹下生成了一个index的文件夹，里面包含

- config.ts
- index.interface.ts
- index.scss
- index.tsx
- model.ts
- service.ts


## 配置业务代码

### 1、先在`src`目录下创建`models`文件夹，集合项目里的`model`关系。

```h

import index from '../pages/index/model';


export default[
    index
]

```

项目目前只有`index`页面，`export default`这里的数组就只有`index`，需要注意这里是`[]`数组。




### 2、修改非常主要的文件`app.tsx`

```h

import Taro, { Component, Config } from '@tarojs/taro'
import "@tarojs/async-await";
import { Provider } from "@tarojs/redux";
import dva from './utils/dva';
import './utils/request';
import { globalData } from './utils/common';

import models from './models'
import Index from './pages/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


const dvaApp = dva.createApp({
  initialState:{},
  models:  models,
})

const store = dvaApp.getStore();

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   */
  async componentDidMount () {
    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo
    const query = this.$router.params.query
    !globalData.extraData && (globalData.extraData = {})
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      }
    }

    // 获取设备信息
    const sys = await Taro.getSystemInfo()
    sys && (globalData.systemInfo = sys)
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))


```

### 3、修改接口请求`./src/pages/index/config.ts`文件

一个获取列表数据接口

```h

export default {
  getList: '/getlist', //getlist接口
}

```


### 4、修改`./src/config/requestConfig.ts`文件的映射关系

引入`index`页面的刚刚创建的`config`文件

```h

import index from "../pages/index/config"; // index的接口



/** 
 * 请求公共参数
*/
export const commonParame = {}

/** 
 * 请求的映射文件
*/

export const requestConfig = {
    loginUrl:'/api/user/wechat-auth', // 微信的登陆接口
    ...index
}


```

### 5、修改`./src/pages/index/service.ts`里的接口请求

还是依据之前的`getlist`接口

```h

import Api from '../../utils/request'

export const getList = (data) => {

  return Api.getList(data)

}
  

```

### 6、修改`./src/pages/index/index.interface.ts`里的参数类型

根据项目具体的参数，自行进行配置

```h

/**
 * index.state 参数类型
 * @interface IndexState
 */
export interface IndexState {

}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
    dispatch?: any,
    data?: Array<DataInterface>
}

export interface DataInterface {
    des:string,
    lunar:string,
    thumbnail_pic_s:string,
    title:string,
    _id:string
}

```

### 7、修改`./src/pages/index/model.ts`里`effects`函数

在这里创建页面需要请求的接口，链接`service`里的接口发起数据请求,这里以`getList`为例。

```h

// import Taro from '@tarojs/taro';
import * as indexApi from './service';

export default {
  namespace: 'index',
  state: {
    data:[],
    v:'1.0',
  },

  effects: {
    *getList({ payload },{select, call, put}){
      const { error, result} = yield call(indexApi.getList,{
        ...payload
      })
      console.log('数据接口返回',result);
      
      if (!error) {
        yield put({
          type: 'save',
          payload: {
            data:result.data
          },
        })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }

}

```

### 8、修改`./src/pages/index/index.tsx`里页面结构

这里简单的实现列表新闻页面。

```h

import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
// import {  } from '../../components'

@connect(({ index }) => ({
    ...index,
}))

class Index extends Component<IndexProps,IndexState > {
  config:Config = {
    navigationBarTitleText: 'taro_dva_typescript'
  }
  constructor(props: IndexProps) {
    super(props)
    this.state = {}
  }

  async getList() {
    await this.props.dispatch({
      type: 'index/getList',
      payload: {}
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const { data } = this.props
    console.log('this.props===>>',data);
    
    return (
      <View className='fx-index-wrap'>
          <View className='index-topbar'>New资讯</View>
          <View className='index-data'>
            {
              data && data.map((item,index) => {
                return (
                  <View className='index-list' key={index}>
                    <View className='index-title'>{item.title}</View>
                    <View className='index-img' style={`background-image: url(${item.thumbnail_pic_s})`}></View>
                  </View>
                )
              })
            }
          </View>
      </View>
    )
  }
}

export default Index


```

### 9、修改`./src/pages/index/index.scss`首页的样式

这里的写法是`sass`的语法糖


```h

@import "../../assets/scss/variables";

.#{$prefix} {

  &-index-wrap {
    width: 100%;
    min-height: 100vh;
    .index {
      &-topbar {
        padding: 10rpx 50rpx;
        text-align: center;
        font-weight: bold;
        color: #333;
        font-size: 30rpx;
      }
  
      // &-data {
      // }
       
      &-title {
        font-size: 28rpx;
        color: #666;
        width: 100%;
        font-weight: bold;
      }
      &-list{
        border-bottom: 1rpx solid #eee;
        padding-bottom: 20rpx;
        margin: 20rpx 24rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center
      }
  
      &-img {
        width: 70%;
        height: 200rpx;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: right center;
      }
    }
  }
 
}


```

# 项目启动

运行小程序编译命令

`cnpm run dev:weapp`

等待项目编译完成，会在项目根目录下生成一个`dist`,打开微信小程序开发者根据，导入本地刚刚生成的`dist`文件，就成功启动了项目。

效果预览图：

![Taro](https://raw.githubusercontent.com/Duanruilong/phone_drl/master/image/taro/tdt2.jpg)


***

如有啥问题欢迎讨论，共同学习。

项目示例Github地址：[https://github.com/Duanruilong/taro_dva_typescript](https://github.com/Duanruilong/taro_dva_typescript)




