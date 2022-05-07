const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'development',
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/i,
        //include: path.resolve(__dirname, './client'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jsx|js)$/,
        //include: path.resolve(__dirname, "./client"),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader'],
      },
    ],
  },
//   resolve: {
//     modules: [__dirname, "src", "node_modules"],
//     extensions: ["*", ".js", ".jsx"],
//   }
};
