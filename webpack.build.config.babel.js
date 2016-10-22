import { DefinePlugin, optimize } from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const deployFolder = 'bin';
const deployPath = path.resolve(__dirname, deployFolder);
const entryPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

export default {
    entry: path.resolve(entryPath, 'lib/index.js'),

    output: {
        path: deployPath,
        filename: 'joymap.min.js',
        library: 'joymap',
        libraryTarget: 'umd'
    },

    module: {
        rules: [{
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
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

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
