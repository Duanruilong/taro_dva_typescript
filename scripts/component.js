/**
 * pages页面快速生成脚本 
 * 
 * 用法：npm run com `文件名`
 * 
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

//页面模板
const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
import './${dirName}.scss'

class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
  constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps:${capPirName}Props = {}

  render() {
    return (
      <View className='fx-${dirName}-wrap'>

      </View>
    )
  }
}

export default ${capPirName}
`

// scss文件模版
const scssTep = `@import "../../assets/scss/variables";

.#{$prefix} {

  &-${dirName}-wrap {
    width: 100%;
  }
}
`

const interfaceTep = `/**
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

fs.mkdirSync(`./src/components/${dirName}`); // mkdir $1
process.chdir(`./src/components/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
