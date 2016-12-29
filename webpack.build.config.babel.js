import { DefinePlugin, optimize } from 'webpack';
import path from 'path';

import CleanWebpackPlugin from 'clean-webpack-plugin';

const deployFolder = 'bin';
const deployPath = path.resolve(__dirname, deployFolder);
const entryPath = path.resolve(__dirname, 'src');

export default {
    entry: path.resolve(entryPath, 'index.js'),

    output: {
        path: deployPath,
        filename: 'joymap.min.js',
        library: 'joymap',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: entryPath
        }]
    },

    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin([deployFolder], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new optimize.UglifyJsPlugin({
            minify: true,
            mangle: true,
            sourceMap: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};
