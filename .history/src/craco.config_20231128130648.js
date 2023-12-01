// craco.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
    ],
  },
};
