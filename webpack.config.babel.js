import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

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
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['lodash', 'transform-runtime']
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

        new CopyWebpackPlugin([{ from: publicPath }])
    ]
};
