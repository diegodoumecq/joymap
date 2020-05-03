import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Autoprefixer from 'autoprefixer';

const port = 9001;
const devBundlePath = path.resolve(__dirname, 'devBundle');
const devPath = path.resolve(__dirname, 'examples');
const libPath = path.resolve(__dirname, 'src');
const staticPath = path.resolve(__dirname, 'assets');
const docPath = path.resolve(__dirname, 'docs');

export default function (env = {}) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      port,
      contentBase: devPath,
      host: '0.0.0.0',
    },

    performance: { hints: false },

    devtool: env.mode === 'docs' ? false : 'source-map',

    mode: env.mode === 'docs' ? 'production' : 'development',

    entry: {
      main: path.resolve(__dirname, 'examples/Main/index.tsx'),
      readme: path.resolve(__dirname, 'examples/Main/Readme/index.ts'),
      fighting: path.resolve(__dirname, 'examples/Fighting/Fighting.ts'),
      log: path.resolve(__dirname, 'examples/Log/Log.ts'),
      react: path.resolve(__dirname, 'examples/React/React.tsx'),
      video: path.resolve(__dirname, 'examples/Video/Video.ts'),
      rumble: path.resolve(__dirname, 'examples/Rumble/Rumble.ts'),
      editor: path.resolve(__dirname, 'examples/Editor/Editor.jsx'),
    },

    output: {
      path: env.mode === 'docs' ? docPath : devBundlePath,
      filename: '[name].bundle.js',
      futureEmitAssets: false,
    },

    resolve: {
      extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
      modules: ['node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.ts[x]?$/,
          rules: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
          include: [devPath, libPath],
        },
        {
          test: /\.js[x]?$/,
          rules: [{ loader: 'babel-loader' }],
          include: [devPath, libPath],
        },
        {
          test: /\.styl$/,
          rules: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [Autoprefixer],
              },
            },
            {
              loader: 'stylus-loader',
              query: {
                'resolve url': true,
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          rules: [
            {
              loader: 'url-loader',
              options: {
                limit: false,
              },
            },
          ],
        },
        {
          test: /\.woff[2]?$/,
          rules: [
            {
              loader: 'url-loader',
              options: {
                limit: false,
                mimetype: 'application/font-woff',
              },
            },
          ],
        },
        {
          test: /\.ttf$/,
          rules: [
            {
              loader: 'file-loader',
              options: {
                limit: false,
                name: './fonts/[name].[ext]',
                mimetype: 'application/octet-stream',
              },
            },
          ],
        },
        {
          test: /\.eot$/,
          rules: [{ loader: 'file-loader' }],
        },
        {
          test: /\.md$/,
          rules: [{ loader: 'raw-loader' }],
        },
      ],
    },

    plugins: [
      new WriteFilePlugin(),

      new CleanWebpackPlugin({
        verbose: true,
      }),

      new CopyWebpackPlugin([{ from: staticPath }]),
    ],
  };
}
