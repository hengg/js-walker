# React Learning

[pure render](https://zhuanlan.zhihu.com/purerender)

[Redux中文文档](http://cn.redux.js.org/index.html)

[react-webpack-cookbook](http://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html)

## React

React 不是完整的 MVC/MVVM 框架，它专注于视图层。它提供了 virtual DOM 来减少对 DOM 的直接操作从而提升性能。

### Virtual DOM

真实的页面对应着一个 DOM 树，每次变更页面时，都需要操作 DOM 树，而它的开销非常大。React 把 DOM 树映射成 JavaScript 对象，即 Virtual DOM，每次更新数据后，首先计算 Virtual DOM 并和上一次的 Virtual DOM 进行比较，仅对发生变化的部分做更新。

### JSX

JSX 是类 XML 语法的 JavaScript 扩展。使用 react 不强制使用 JSX，但官方强烈建议这么做。
```javascript
//使用JSX
render(
    <div>
      {/* JSX 本质上是 JavaScript，所以可以这样注释 */}
        <h1
        /*多行注释
          在标签外注释需要使用{}包裹
          标签内则不需要*/
        >Hello World</div>
    </div>,
    document.getElementById('example')
);

//不使用JSX
render(
    React.createElement('div', null,
        React.createElement('h1', null,'Hello World')
    ),
    document.getElementById('example')
);
```
JSX 使用类 XML 语法来创建虚拟元素，所以它的标签也可以任意嵌套。注意：标签必须闭合；定义组件元素时只允许被一个标签包裹。

JSX 中首字母为大写的标签对应组件元素，小写的则对应 DOM 元素。由于 class 和 for 是 JavaScript 关键字，所以在 JSX 中 DOM 元素的 class 属性改为 className；for 属性改为 htmlFor。其他属性与标准属性相同。而组件元素的属性则是自定义属性，相当于函数的参数。

在 JSX 中已声明未赋值的 Boolean 属性值默认为 true，所以属性为 true 时```<Checkbox checked={true}>```可以简写为```<Checkbox checked>```，反之```<Checkbox checked={false}>```可以省略 checked 属性为```<Checkbox >```。

组件可以使用 ES6 的展开属性：```props={name:'name' value:'value'} <Component {...props}>```相当于```<Component name='name' value='value'>```。

### 组件

React 组件基本由 props、state 及生命周期方法构成。

#### ES6 classes 构建组件：

```JavaScript
import React, { Component } from 'react'

export default class Button extends Component {
  constructor(props){
    super(props);
  }

  static defaultProps={
    color:'blue',
    text:'OK',
  }

  render() {
    return (
      <button className={'btn btn-${color}'}>
        <em>{text}</em>
      </button>
    );
  }
}
```
当另一个组件调用此组件时会创建实例对象，调用几次则创建几个实例。

#### 无状态函数

```JavaScript
function Button({color='blue',text='OK'}){
  return(
    <button className={'btn btn-${color}'}>
      <em>{text}</em>
    </button>
  );
}
```
这种方式定义的组件不存在 state，也没有生命周期方法。无状态组件在创建时始终保持了一个实例。理想情况下，大部分组件都应该是无状态的，可以具有更好的性能。

### 数据流

React 会根据 props 或 state 更新视图状态。两者区别如下：
- props 会在整个组件数中传递数据和配置，props 可以设置任意类型的数据（包括组件），用于父组件与子组件的通信。props 改变时会向下遍历整个组件树，并重新渲染使用这个属性的组件。通过 function prop 子组件可以与父组件通信。
- state 只能在组件内部使用，state 只应该用于存储简单的视图状。state 改变时该组件重新渲染。
- props 和 state 都不能直接修改，应该使用```setProps()```和```setSate()```方法修改。
React 中有一个内置的 prop:children，它代表子组件的集合。

### 生命周期

在 ES6 中```getDefaultProps```和```getInitialState```的工作分别由```defaultProps```和```constructor```中的```this.state```代替。
![react生命周期](/Imgs/react生命周期.png)

### 事件

```html
<!-- JSX -->
<button onClick={this.handleClick}>Click</button>
<!-- DOM -->
<button onclick="handleClick()">Click</button>
```
事件委派：React 把所有事件绑定到结构的最外层，使用一个统一的事件监听器来维护所有组件内部的事件监听和处理函数。

事件绑定：需要将每个方法的上下文（this）绑定为当前组件。ES6 下需要手动绑定：
```JavaScript
/*bind方法*/
handleClick(arg){console.log(arg);}

render(){
    return <button onClick={this.handleClick.bind(this,'arg')}></button>
}
/*如果方法只绑定不传参则可以使用双冒号语法，等价于this.handleClick.bind(this)*/
handleClick(){console.log('handle');}

render(){
    return <button onClick={::this.handleClick}></button>
}
/*在构造器内声明*/
handleClick(){
  console.log('handle');
  this.handleClick=this.handleClick.bind(this);
}

render(){
    return <button onClick={this.handleClick}></button>
}
/*箭头函数1*/
const handleClick = () => {
  console.log('handle');
  this.handleClick=this.handleClick.bind(this);
}

render(){
    return <button onClick={this.handleClick}></button>
}
/*箭头函数2*/
handleClick(){
  console.log('handle');
}

render(){
    return <button onClick={() => this.handleClick()}></button>
}
```
在 React 中也可以使用原生事件：
```javascript
componentDidMount(){
  /*此时组件在浏览器中存在真实的DOM*/
  this.refs.button.addEventListener('click',e => {
    handleClick(e);
  });
}

handleClick(e){
  console.log(e);
}

componentWillUnmont(){
  /*在组件卸载时手动移除原生事件，否则容易造成内存泄漏*/
  this.refs.button.removeEventListener('click');
}

render(){
    return <button ref="button"></button>
}
```
### 样式处理

可以通过```style```prop 设置组件的行内样式：
```javascript
const style = {
  color:'white'
}
const component = <Component style={style} />;
```
也可以像普通 HTML 一样使用 CSS。如果想给组件设置类名，需要设置```className```prop 来避免冲突。

#### CSS Modules

使用 JavaScript 来管理样式依赖。```webpack css-loader```内置此功能。启用后样式默认局部化，且经过混淆的 class 名基本不会重复。
```javascript
/*webpack.config.js*/
{
    test: /\.css$/,
    loader: 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]' //localIdentName 是混淆 class 命名规则
},
```
CSS 文件：
```css
.base { /*通用基本样式*/ }

.disabledConfirmButton {
  /* 使用 composes 复用样式组合*/
  composes: base;
  /* button 相关的其他样式 */
}
```
在 JS 文件中引用：
```javascript
import styles from './Button.css';
...
  <button class=${styles.disabledConfirmButton}>OK</button>
...
```

### 组件间通信

#### 父组件到子组件

通过 props 传递。

#### 子组件到父组件

- 利用回调函数
- 利用自定义事件
```JavaScript
/*ListItem*/
static defaultProps = {
  text:'',
  checked:false,
}
render(){
  return(
    <li>
      <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange}/>
      <span>{this.props.value}</span>
    </li>
  );
}
/*List*/
static defaultProps={
  list:[],
  handleItemChange:()=>{},
}

constructor(props){
  super(props);
  this.state={
    list:this.props.list.map(entry => ({
      text:entry.text,
      checked:entry.checked,
    })),
  };
}

onItemChange(entry){
  const {list} = this.state;
  this.setState({
    list:list.map(prevEntry => ({
      text:prevEntry.text,
      checked:prevEntry.checked,
    })),
  });
  this.props.handleItemChange(entry);
}

render(){
  return (
    <div>
      <ul>
        {this.state.list.map((entry,index) => (
          <ListItem key={'list-${index}'}
            value = {entry.text}
            checked = {entry.checked}
            onChange = {this.onItemChange.bind(this,entry)}
          />
        ))}
      </ul>
    </div>
  );
}
/*使用List*/
constructor(props){
  super(props);
  this.handleItemChange=this.handleItemChange.bind(this);
}

handleItemChange(item){
  console.log(item);
}

render(){
  return (
    <List list={[/*list*/]}
      handleItemChange={this.handleItemChange}
    />
  );
}
```

#### 跨级组件通信

使用```context```:
```JavaScript
/*ListItem*/
static contextTypes = {
  color:PropTypes.string,
}

render(){
  const {value} = this.props;
  return(
    <li style={{background:this.context.color}}>
      <span>{value}</span>
    </li>
  );
}
/*List*/
static childContextTypes = {
  color:PropTypes.string,
}

getChildContext(){
  return {
    color:'blue',
  }
}

render(){
  const {list} = this.props;
  return (
    <div>
      <ul>
        {list.map((entry,index) => (
          <ListItem key={'list-${index}'}
            value = {entry.text}
          />
        ))}
      </ul>
    </div>
  );
}
```

### 高阶组件

高阶组件类似于高阶函数，输入 React 组件，返回新的 React 组件，这样就可以实现组件共用。在 React 中有属性代理（props proxy）和反向继承（inheritance inversion）两种方式。

#### 属性代理

高阶组件通过被包裹的组件来操作 props.

#### 反向继承

### 组件优化

### 动画

### 服务端渲染
React提供了`renderToString`和`renderToStaticMarkup`两个API来实现服务端渲染。
- `renderToString`把React元素转换成HTML字符串并在服务端标识reactid。在浏览器端再次渲染时只需事件绑定而无需重新渲染整个DOM树。
- `renderToStaticMarkup`相当于简化版的`renderToString`，如果应用基本是静态文本，建议使用这个方法。

## Webpack

Webpack分析项目结构，将JavaScript模块及less/scss/TypeScript等浏览器不能直接运行的语言打包为浏览器可使用的文件。

### 项目的说明文件

npm init命令创建```package.json```，它是npm的说明文件，声明了当前项目的依赖模块，自定义的脚本任务等:
```json
{
    "name": "react-learning",
    "version": "0.0.1",
    "description": "Learning react with webpack,babel and redux",
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
