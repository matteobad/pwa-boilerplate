const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

module.exports = () => ({
  entry: {
    app: ['webpack-plugin-serve/client']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Copy empty ServiceWorker so install doesn't blow up
    new CopyWebpackPlugin(['src/sw.js']),
    new Serve({
      host: 'localhost',
      static: ['./'],
      open: true,
      liveReload: true
    })
  ],
  mode: 'development',
  devtool: 'source-map',
  watch: true
});
