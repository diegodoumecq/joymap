import { DefinePlugin, LoaderOptionsPlugin } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';

const deployPath = path.resolve(__dirname, 'bin');
const entryPath = path.resolve(__dirname, 'src');

export default {
  entry: path.resolve(entryPath, 'index.ts'),

  mode: 'production',

  output: {
    path: deployPath,
    filename: 'joymap.min.js',
    library: 'joymap',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  resolve: {
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        rules: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader', options: { configFile: 'tsconfig.prod.json' } },
        ],
        include: entryPath,
      },
    ],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          mangle: {
            keep_fnames: true,
          },
          compress: true,
        },
      }),
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};
