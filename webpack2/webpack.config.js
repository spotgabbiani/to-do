const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = (options) => {
  const webpackConfig = {
    devtool: options.devtool,
    context: path.resolve(__dirname, '../src'),
    entry: {
      app: './index.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].chunk.js'
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules')
      ]
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        include: path.resolve(__dirname, '../src'),
        use: [{ loader: 'babel-loader', options: { ignore: '/node_modules/' } }]
      }, {
        test: /\.json$/,
        use: ['json-loader']
      }, {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }]
      }, {
        test: /\.(ttf|eot|png|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader?name=[path][name].[ext]']
      }, {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }]
    },
    plugins: [],
    devServer: {
      contentBase: path.resolve(__dirname, './src'),
      publicPath: '/',
      historyApiFallback: true,
      port: 4444,
      compress: false,
      inline: true,
      disableHostCheck: true,
      open: true,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: true,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m'
        }
      }
    }
  };

  if (options.isProduction) {
    webpackConfig.devServer = {};
    webpackConfig.plugins = [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'node-static',
        filename: 'node-static.js',
        minChunks(module) {
          const context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new MinifyPlugin({ removeConsole: true }),
      new HtmlWebpackPlugin({ template: path.join(__dirname, '../src/index.html') }),
      new CopyWebpackPlugin([{ from: 'common/img/logotype', to: 'common/img/logotype/' }]),
      new CopyWebpackPlugin([{ from: 'common/img/favicon.ico', to: 'common/img/favicon.ico' }])
    ];
  }

  if (options.isDevelopment) {
    webpackConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks(module) {
          const context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        }
      })
    ];
  }

  return webpackConfig;
};
