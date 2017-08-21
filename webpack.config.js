const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { assign } = Object
require('dotenv').config()

const { PORT } = process.env
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
}

const commonConfig = {
  entry: {
    app: [
      'react-hot-loader/patch',
      PATHS.app
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-export-extensions'],
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack tut'
    })
  ]
}

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: PORT
    }
  }

  return assign(
    {},
    commonConfig,
    config
  )
}

const productionConfig = () => commonConfig

module.exports = env => {
  return env === 'production'
    ? productionConfig()
    : developmentConfig()
}
