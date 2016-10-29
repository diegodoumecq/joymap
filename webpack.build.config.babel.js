import { optimize } from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const deployFolder = 'bin';
const deployPath = path.resolve(__dirname, deployFolder);
const entryPath = path.resolve(__dirname, 'src');

export default {
    entry: path.resolve(entryPath, 'lib/index.js'),

    output: {
        path: deployPath,
        filename: 'joymap.min.js',
        library: 'joymap',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: [{
            test: /\.js?$/,
            use: ['babel'],
            include: entryPath,
            exclude: /node_modules/
        }]
    },

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },

    plugins: [
        new CleanWebpackPlugin([deployFolder], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),

        new optimize.UglifyJsPlugin({
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
