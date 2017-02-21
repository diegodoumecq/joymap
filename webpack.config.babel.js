import { LoaderOptionsPlugin } from 'webpack';
import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import Autoprefixer from 'autoprefixer';

const port = 9000;
const bundleFolder = 'devBundle';
const binPath = path.resolve(__dirname, bundleFolder);
const libPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

const entries = {
    canvas: {
        path: path.resolve(__dirname, 'examples/Canvas'),
        file: 'Canvas.js'
    },
    arrows: {
        path: path.resolve(__dirname, 'examples/Arrows'),
        file: 'Arrows.js'
    },
    log: {
        path: path.resolve(__dirname, 'examples/StateLog'),
        file: 'StateLog.js'
    },
    react: {
        path: path.resolve(__dirname, 'examples/React'),
        file: 'React.jsx'
    }
};

export default function (env = {}) {
    const entry = entries[env.example];

    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            port,
            contentBase: entry.path,
            host: '0.0.0.0'
        },

        performance: { hints: false },

        devtool: '#source-map',

        entry: path.resolve(entry.path, entry.file),

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
                rules: [{ loader: 'babel-loader' }],
                include: [entry.path, libPath]
            }, {
                test: /\.mstyl$/,
                rules: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    query: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'stylus-loader',
                    query: {
                        'resolve url': true,
                        sourceMap: true
                    }
                }]
            }, {
                test: /\.styl$/,
                rules: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'stylus-loader',
                    query: {
                        'resolve url': true,
                        sourceMap: true
                    }
                }]
            }, {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                rules: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        mimetype: 'application/png'
                    }
                }/* , {
                    loader: 'image-webpack-loader',
                    options: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false
                    }
                }*/
                ]
            }, {
                test: /\.woff[2]?$/,
                rules: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        mimetype: 'application/font-woff'
                    }
                }]
            }, {
                test: /\.ttf$/,
                rules: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        mimetype: 'application/octet-stream'
                    }
                }]
            }, {
                test: /\.eot$/,
                rules: [{ loader: 'file-loader' }]
            }/* , {
                test: /\.svg$/,
                rules: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        mimetype: 'image/svg+xml'
                    }
                }]
            } */]
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
                    postcss: [Autoprefixer({})]
                }
            })
        ]
    };
}
