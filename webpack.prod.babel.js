import { DefinePlugin, optimize, LoaderOptionsPlugin } from 'webpack';
import path from 'path';

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
            rules: [{ loader: 'babel-loader' }],
            include: entryPath
        }]
    },

    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};
