const Webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('../paths');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: paths.appBuild,
    library: {
      name: `${paths.microAppName}`,
      type: 'umd',
    },
    chunkLoadingGlobal: `webpackJsonp_${paths.microAppName}`,
    globalObject: 'window'
  },
  devServer: {
    compress: true,
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
    open: true,
    hot: false,
    proxy: {
      ...require(paths.appProxySetup),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    liveReload: false,
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
