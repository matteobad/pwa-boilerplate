const fs = require('fs');
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
      port: 8080,
      hmr: true,
      // http2: {
      //   key: fs.readFileSync('./build-utils/certificates/server.key'),
      //   cert: fs.readFileSync('./build-utils/certificates/server.cert')
      // }, 
      https: {
        key: fs.readFileSync('./build-utils/certificates/server.key'),
        cert: fs.readFileSync('./build-utils/certificates/server.cert')
      },
      open: true,
      liveReload: true,
      ramdisk: true,
      static: ['./dist'],
    })
  ],
  mode: 'development',
  devtool: 'source-map',
  watch: true
});
