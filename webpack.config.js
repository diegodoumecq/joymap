var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var port = 9000;
var binPath = path.resolve(__dirname, 'bundle');
var entryPath = path.resolve(__dirname, 'src');
var publicPath = path.resolve(__dirname, 'public');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        colors: true,
        port: port,
        outputPath: binPath,
        contentBase: entryPath
    },

    devtool: '#source-map',

    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:' + port,
        path.resolve(entryPath, 'main.jsx')
    ],

    output: {
        path: binPath,
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
        new WriteFilePlugin(),

        new CleanWebpackPlugin(['bundle'], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.LoaderOptionsPlugin({
            minimize: false
        }),

        /*new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),*/

        new CopyWebpackPlugin([
            { from: publicPath }
        ])
    ]
};
