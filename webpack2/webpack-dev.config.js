module.exports = require('./webpack.config.js')({
  isDevelopment: true,
  devtool: 'eval-source-map',
  port: 4444
});
