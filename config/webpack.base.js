const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = ({ appName, exposes = {}, remotes = {}, port }) => ({
  entry: './src/bootstrap.tsx',
  output: { publicPath: 'auto', clean: true },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.(png|jpg|svg)$/, type: 'asset/resource' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: appName,
      filename: 'remoteEntry.js',
      exposes,
      remotes,
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        zustand: { singleton: true, requiredVersion: false },
      },
    }),
  ],
  devServer: { port, historyApiFallback: true, hot: true },
}); 