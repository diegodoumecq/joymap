var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var deployPath = path.resolve(__dirname, 'bin');
var entryPath = path.resolve(__dirname, 'src');
var publicPath = path.resolve(__dirname, 'public');

module.exports = {
    entry: [
        path.resolve(entryPath, 'main.jsx')
    ],

    output: {
        path: deployPath,
        filename: 'bundle.js'
    },

    postcss: function () {
        return [autoprefixer];
    },

    module: {
        loaders:[{
            test: /\.js[x]?$/,
            include: entryPath,
            query: {
                cacheDirectory: true,
                presets: ['es2015-native-modules', 'stage-0', 'react']
            },
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.styl$/,
            loader: 'style!css!postcss!stylus'
        },  {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.png$/,
            loader: 'url',
            query: {
                limit: '10000',
                mimetype: 'application/png'
            }
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url',
            query: {
                limit: '10000',
                mimetype: 'application/font-woff'
            }
        }, {
            test: /\.ttf$/,
            loader: 'url',
            query: {
                limit: '10000',
                mimetype: 'application/octet-stream'
            }
        }, {
            test: /\.eot$/,
            loader: 'file'
        }, {
            test: /\.svg$/,
            loader: 'url',
            query: {
                limit: '10000',
                mimetype: 'image/svg+xml'
            }
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: ['node_modules', 'lib', 'vendor']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new CleanWebpackPlugin(['bin'], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),

        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),*/

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        
        new CopyWebpackPlugin([
            { from: publicPath }
        ])
    ]
};
