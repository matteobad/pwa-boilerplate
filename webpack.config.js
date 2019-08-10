const argv = require('webpack-nano/argv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { mode, presets } = argv;
console.log(argv)
const modeConfig = require(`./build-utils/webpack.${mode}.js`);
const loadPresets = require('./build-utils/loadPresets');

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      entry: {
        app: ['./src/index.js']
      },   
      mode,
      plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new CopyWebpackPlugin(
          [{ from: 'src/img', to: 'img/' }, 'src/manifest.webmanifest'],
          { ignore: ['.DS_Store'] }
        )
      ]
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
