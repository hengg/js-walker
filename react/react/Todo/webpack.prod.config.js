//single bundle
// var path = require('path');
// var config = {
//   entry: path.resolve(__dirname, 'app/main.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       loader: 'babel'
//     }]
//   }
// };
//
// module.exports = config;

//multi bundles
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
    // mobile: path.resolve(__dirname, 'app/mobile.js'),
    // Since react is installed as a node module, node_modules/react,
    // we can point to it directly, just like require('react');
    // 当 React 作为一个 node 模块安装的时候，
    // 我们可以直接指向它，就比如 require('react')
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel',
      query: {
          presets: ['es2015', 'react']
      }
    }, {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;
