module.exports = require('./webpack.config.js')({
  isProduction: true,
  devtool: 'source-map',
  portalType: 'partner'
});
