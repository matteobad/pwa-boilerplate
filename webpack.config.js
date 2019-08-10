const argv = require('webpack-nano/argv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const modeConfig = require(`./build-utils/webpack.${argv.mode}.js`);
const loadPresets = require('./build-utils/loadPresets');

module.exports = () => {
  return webpackMerge(
    {
      entry: {
        app: ['./src/index.js']
      },   
      plugins: [
        new WebpackBar(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new CopyWebpackPlugin(
          [{ from: 'src/img', to: 'img/' }, 'src/manifest.webmanifest'],
          { ignore: ['.DS_Store'] }
        )
      ],
      stats: 'minimal'
    },
    modeConfig(argv),
    loadPresets(argv)
  );
};
