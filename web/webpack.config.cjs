// import path from 'path'
const path = require('path');
// import HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.tsx', // Entry point changed to main.tsx
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Resolve TypeScript and JavaScript extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match .ts and .tsx files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['css-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to HTML template
      filename: 'index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};
