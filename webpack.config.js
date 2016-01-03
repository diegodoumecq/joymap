var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = path = require('path')

module.exports = {
    context: path.join(__dirname, './js'),

    entry: {
        jsx: './main.jsx',
        html: './index.html',
        vendor: ['react']
    },

    output: {
        path: path.join(__dirname, './static'),
        filename: 'bundle.js',
    },

    module: {
        loaders: [{
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }, {
                test: /\.(styl)$/,
                loader: 'style!css!stylus'
            }, {
                test: /\.png?$/,
                loader: 'file'
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel'
                ]
            },
        ],
    },

    devtool: '#source-map', // TODO Only apply for debug

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        })
    ],

    devServer: {
        contentBase: './js',
        hot: true
    }
}
