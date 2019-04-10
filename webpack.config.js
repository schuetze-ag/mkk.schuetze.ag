const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default;
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozJpeg = require('imagemin-mozjpeg');
const ImageminWebp = require('imagemin-webp');

module.exports = (_, { mode }) => {
  const prod = mode === 'production';

  const optimization = prod
    ? {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      }
    : {};

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: prod ? '[name].[contenthash].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          loader: 'ejs-webpack-loader',
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
        {
          test: /\.woff2?$/,
          loader: 'file-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-spread'],
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        inject: 'head',
      }),
      new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),
      new MiniCssExtractPlugin({
        filename: prod ? '[name].[contenthash].css' : '[name].css',
        chunkFilename: prod ? '[id].[contenthash].css' : '[id].css',
      }),
      new HTMLInlineCSSWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: './static',
          to: './static',
          test: /\.ico$|^process\.svg$/,
        },
      ]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|webp)$/i,
        plugins: [
          ImageminMozJpeg({ progressive: true, quality: 70 }),
          ImageminWebp({ quality: 70 }),
        ],
        externalImages: {
          context: './static',
          sources: glob.sync('static/**/*.{jpg,png,webp}'),
          destination: './public/static',
          fileName: '[path][name].[ext]',
        },
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
