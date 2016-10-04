var webpack = require('webpack');
var path = require('path');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var deployFolder = 'bin';
var deployPath = path.resolve(__dirname, deployFolder);
var entryPath = path.resolve(__dirname, 'src');
var publicPath = path.resolve(__dirname, 'public');

module.exports = {
    entry: [
        path.resolve(entryPath, 'lib/index.js')
    ],

    output: {
        path: deployPath,
        filename: 'joymap.min.js'
    },

    module: {
        loaders:[{
            test: /\.js?$/,
            include: entryPath,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['lodash', 'transform-runtime']
            },
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new CleanWebpackPlugin([deployFolder], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        })
    ]
};
