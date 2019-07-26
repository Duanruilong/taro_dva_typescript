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
 

## 问题说明
1. taro-ui@2.0.1 不兼容问题，需要还原旧版: cnpm install taro-ui@1.5.4 

