const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = (_, { mode }) => {
  const prod = mode === 'production';

  const optimization = prod
    ? {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      }
    : {};

  return {
    entry: {
      styles: './src/styles/styles.scss',
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: prod ? '[name].[contenthash].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          loader: 'ejs-compiled-loader',
        },
        {
          test: /\.scss$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './static',
          to: './static',
        },
      ]),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        chunks: ['styles'],
      }),
      new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
      }),
      new MiniCssExtractPlugin({
        filename: prod ? '[name].[contenthash].css' : '[name].css',
        chunkFilename: prod ? '[id].[contenthash].css' : '[id].css',
      }),
    ],
    devServer: {
      contentBase: 'public',
      watchContentBase: true,
      hot: true,
      port: process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
    },
    optimization,
  };
};
