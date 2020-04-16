import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Autoprefixer from 'autoprefixer';

const port = 9001;
const bundleFolder = 'devBundle';
const binPath = path.resolve(__dirname, bundleFolder);
const libPath = path.resolve(__dirname, 'src');
const staticPath = path.resolve(__dirname, 'assets');

const entries = {
  canvas: {
    path: path.resolve(__dirname, 'examples/Canvas'),
    file: 'Canvas.ts',
  },
  fighting: {
    path: path.resolve(__dirname, 'examples/Fighting'),
    file: 'Fighting.ts',
  },
  log: {
    path: path.resolve(__dirname, 'examples/StateLog'),
    file: 'StateLog.ts',
  },
  react: {
    path: path.resolve(__dirname, 'examples/ReactPad'),
    file: 'index.tsx',
  },
  video: {
    path: path.resolve(__dirname, 'examples/Video'),
    file: 'Video.ts',
  },
  rumble: {
    path: path.resolve(__dirname, 'examples/Rumble'),
    file: 'Rumble.ts',
  },
};

export default function (env = {}) {
  const entry = entries[env.example];

  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      port,
      contentBase: entry.path,
      host: '0.0.0.0',
    },

    performance: { hints: false },

    devtool: '#source-map',

    mode: 'development',

    entry: path.resolve(entry.path, entry.file),

    output: {
      path: binPath,
      filename: 'bundle.js',
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
          include: [entry.path, libPath],
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
                limit: '10000',
                mimetype: 'application/png',
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
                limit: '10000',
                mimetype: 'application/font-woff',
              },
            },
          ],
        },
        {
          test: /\.ttf$/,
          rules: [
            {
              loader: 'url-loader',
              options: {
                limit: '10000',
                mimetype: 'application/octet-stream',
              },
            },
          ],
        },
        {
          test: /\.eot$/,
          rules: [{ loader: 'file-loader' }],
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
