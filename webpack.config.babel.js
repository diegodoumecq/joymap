import { LoaderOptionsPlugin } from 'webpack';
import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import PostcssSmartImport from 'postcss-smart-import';
import Autoprefixer from 'autoprefixer';

const port = 9000;
const bundleFolder = 'devBundle';
const binPath = path.resolve(__dirname, bundleFolder);
const entryPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

export default {
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

    entry: path.resolve(entryPath, 'examples.jsx'),

    output: {
        path: binPath,
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js[x]?$/,
            include: entryPath,
            use: ['babel'],
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['lodash', 'transform-runtime']
            }
        }, {
            test: /\.styl$/,
            use: ['style', 'css', 'postcss', 'stylus']
        },  {
            test: /\.css$/,
            use: ['style', 'css', 'postcss']
        }, {
            test: /\.png$/,
            use: ['url'],
            query: {
                limit: '10000',
                mimetype: 'application/png'
            }
        }, {
            test: /\.woff[2]$/,
            use: ['url'],
            query: {
                limit: '10000',
                mimetype: 'application/font-woff'
            }
        }, {
            test: /\.ttf$/,
            use: ['url'],
            query: {
                limit: '10000',
                mimetype: 'application/octet-stream'
            }
        }, {
            test: /\.eot$/,
            use: ['file']
        }, {
            test: /\.svg$/,
            use: ['url'],
            query: {
                limit: '10000',
                mimetype: 'image/svg+xml'
            }
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },

    plugins: [
        new WriteFilePlugin(),

        new CleanWebpackPlugin([bundleFolder], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),

        new CopyWebpackPlugin([{ from: publicPath }]),

        new LoaderOptionsPlugin({
            options: {
                postcss: [
                    PostcssSmartImport({}),
                    Autoprefixer({})
                ]
            }
        })
    ]
};
