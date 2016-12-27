var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/, // Only .css files
                loader: 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]' // Run CSS Modules loaders
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },

            // SASS
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
};

//deploy config
// module.exports = config;
//
// var path = require('path');
// var node_modules_dir = path.resolve(__dirname, 'node_modules');
//
// var config = {
//   entry: path.resolve(__dirname, 'app/main.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       exclude: [node_modules_dir],
//       loader: 'babel'
//     }]
//   }
// };

module.exports = config;
