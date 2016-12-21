# React Learning
[react-webpack-cookbook](http://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html)
## Webpack

### Webpack

Webpack分析项目结构，将JavaScript模块及less/scss/TypeScript等浏览器不能直接运行的语言打包为浏览器可使用的文件。

#### 项目的说明文件
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
#### webpack的配置文件
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

#### loaders
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
