# React Learning
[react-webpack-cookbook](http://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html)
## Webpack

Webpack分析项目结构，将JavaScript模块及less/scss/TypeScript等浏览器不能直接运行的语言打包为浏览器可使用的文件。

### 项目的说明文件
npm init命令创建```package.json```，它是npm的说明文件，声明了当前项目的依赖模块，自定义的脚本任务等:
```json
{
    "name": "react-learning",
    "version": "0.0.1",
    "description": "Learning react with webpack and babel",
    "author": "hengg",
    "license": "MIT",
    "main": "app/main.js",
    "scripts": {
        "build": "webpack",
        "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
        "deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"
    },
    "dependencies": {
        "react": "^15.4.1",
        "webpack-dev-server": "^1.16.2"
    },
    "devDependencies": {
        "babel-loader": "^6.2.10",
        "babel-preset-es2015": "^6.18.0",
        "babel-preset-react": "^6.16.0",
        "css-loader": "^0.26.1",
        "style-loader": "^0.13.1"
    }
}

```
### webpack的配置文件
```javascript
//webpack.config.js
...
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
...
```
通过指定的入口文件，webpack能够识别项目所依赖的其他模块;上述文件中的__dirname是node.js的指向当前执行脚本所在目录的全局变量。

### loaders
通过loader，webpack调用外部的脚本或工具可以对各种各样的格式的文件进行处理。通过使用```Babel```可以将ES6及JSX转换为浏览器可识别的JS文件。


## Babel
### 在Webpack中配置Babel
为了转换ES6及JSX,需要如下配置：
```javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
  ...
}
```
另外，通过引入css-loader和style-loader，Webpack能够把样式表嵌入webpack打包后的JS文件中.

##Redux
[Redux中文文档](http://cn.redux.js.org/index.html)

Redux是state管理器，它适用于多交互、多数据源的场景，它的设计思想：


    （1）Web 应用是一个状态机，视图与状态是一一对应的。

    （2）所有的状态，保存在一个对象里面。


### Action
Action 是把数据从应用传到 store 的有效载荷，而 store 是应用全局唯一的。一般使用 store.dispatch() 将 action 传到 store。

Action 是一个 JavaScript 对象。它使用一个字符串类型的 type 字段来表示要执行的动作，其余的结构则可以自定义:
```javascript
{
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}
```
为了使 action 更容易移植和测试，通常使用 action 创建函数：
```javascript
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}
```
Dispatch：
```javascript
dispatch(addTodo(text))
```
### Reducer
Reducer 是一个函数，它接收旧的 state 和 action，返回新的 state。
不要在 reducer 中做如下操作：
- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 Date.now() 或 Math.random()。

```javascript
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}
```


不要修改 state。 使用 ```Object.assign()``` 新建一个副本；
在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

### Store
一个 redux 应用只有一个单一的 store。

Store 有以下职责：

- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

```javascript
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
```
