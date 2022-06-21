/**
 * @Author: Caven
 * @Date: 2021-03-14 00:41:29
 */

'use strict'

const path = require('path')
const webpack = require('webpack')
const JavaScriptObfuscator = require('webpack-obfuscator')
const common = require('./common')

module.exports = env => {
  const IS_PROD = (env && env.production) || false
  const publicPath = IS_PROD ? '/' : '/'
  let plugins = [...common.plugins]
  if (IS_PROD) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
    // plugins.push(
    //   new JavaScriptObfuscator(
    //     {
    //       rotateStringArray: true
    //     },
    //     []
    //   )
    // )
  }
  return {
    entry: {
      'dc.s3m': ['entry']
    },
    devtool: IS_PROD ? false : 'cheap-module-eval-source-map',
    output: {
      filename: IS_PROD ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, '..', 'packages/s3m/dist'),
      publicPath: publicPath,
      library: 'DcS3M',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            compact: false,
            ignore: ['checkTree']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        '@dc-modules': path.resolve(__dirname, '..', 'modules'),
        's3m-lib': path.resolve(__dirname, '..', 'libs/s3m'),
        entry: path.resolve(__dirname, '..', 'packages/s3m/index.js')
      }
    },
    plugins
  }
}
