const { disableEsLint, override } = require('customize-cra');

const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyWebpackPlugin = (config) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/html5-qrcode/dist/html5-qrcode.min.js',
          to: `static/js/html5-qrcode.min.js`,
        },
      ],
    })
  );

  return config;
};

const htmlWebpackTagsPlugin = (config) => {
  config.plugins.push(
    new HtmlWebpackTagsPlugin({
      tags: ['/static/js/html5-qrcode.min.js'],
      append: true,
      publicPath: false,
    })
  );

  return config;
};

module.exports = {
  webpack: override(disableEsLint(), copyWebpackPlugin, htmlWebpackTagsPlugin),
};
