import { DefinePlugin, LoaderOptionsPlugin } from 'webpack';
import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import PostcssSmartImport from 'postcss-smart-import';
import Autoprefixer from 'autoprefixer';

const port = 9000;
const bundleFolder = 'devBundle';
const binPath = path.resolve(__dirname, bundleFolder);
const entryPath = path.resolve(__dirname, 'examples');
const libPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

export default {
    devServer: {
        historyApiFallback: true,
        hot: true,
        port,
        contentBase: entryPath
    },

    devtool: '#source-map',

    entry: path.resolve(entryPath, 'examples.jsx'),

    output: {
        path: binPath,
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },

    module: {
        rules: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            include: [entryPath, libPath]
        }, {
            test: /\.styl$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.png$/,
            loader: 'url-loader',
            options: {
                limit: '10000',
                mimetype: 'application/png'
            }
        }, {
            test: /\.woff[2]?$/,
            loader: 'url-loader',
            options: {
                limit: '10000',
                mimetype: 'application/font-woff'
            }
        }, {
            test: /\.ttf$/,
            loader: 'url-loader',
            options: {
                limit: '10000',
                mimetype: 'application/octet-stream'
            }
        }, {
            test: /\.eot$/,
            loader: 'file-loader'
        }, {
            test: /\.svg$/,
            loader: 'url-loader',
            options: {
                limit: '10000',
                mimetype: 'image/svg+xml'
            }
        }]
    },

    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

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
