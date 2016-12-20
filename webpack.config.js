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
                loader: 'style!css' // Run both loaders
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

module.exports = config;
