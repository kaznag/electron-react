const { merge } = require('webpack-merge');
const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.common');

const outputPath = path.resolve(common.rootPath, 'dist/prod');

const main = merge(common.main, {
  mode: 'production',
  output: {
    path: outputPath,
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }),
  ]
});

const renderer = merge(common.renderer, {
  mode: 'production',
  output: {
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
});

const preload = merge(common.preload, {
  mode: 'production',
  output: {
    path: outputPath,
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }),
  ]
});

module.exports = [
  main,
  renderer,
  preload,
];
