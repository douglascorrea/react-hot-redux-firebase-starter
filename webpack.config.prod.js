var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false,
            screw_ie8: true
        }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  }
};

// export default config;




// 'use strict';
//
// var path = require('path');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var StatsPlugin = require('stats-webpack-plugin');
//
// module.exports = {
//     // The entry file. All your app roots fromn here.
//     entry: [
//         path.join(__dirname, 'client/index.js')
//     ],
//     // Where you want the output to go
//     output: {
//         path: path.join(__dirname, '/dist/'),
//         filename: '[name]-[hash].min.js',
//         publicPath: '/'
//     },
//     plugins: [
//         // webpack gives your modules and chunks ids to identify them. Webpack can vary the
//         // distribution of the ids to get the smallest id length for often used ids with
//         // this plugin
//         new webpack.optimize.OccurenceOrderPlugin(),
//
//         // handles creating an index.html file and injecting assets. necessary because assets
//         // change name because the hash part changes. We want hash name changes to bust cache
//         // on client browsers.
//         new HtmlWebpackPlugin({
//             template: 'client/index.tpl.html',
//             inject: 'body',
//             filename: 'index.html'
//         }),
//         // extracts the css from the js files and puts them on a separate .css file. this is for
//         // performance and is used in prod environments. Styles load faster on their own .css
//         // file as they dont have to wait for the JS to load.
//         new ExtractTextPlugin('[name]-[hash].min.css'),
//         // handles uglifying js
//         new webpack.optimize.UglifyJsPlugin({
//             compressor: {
//                 warnings: false,
//                 screw_ie8: true
//             }
//         }),
//         // creates a stats.json
//         new StatsPlugin('webpack.stats.json', {
//             source: false,
//             modules: false
//         }),
//         // plugin for passing in data to the js, like what NODE_ENV we are in.
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('production')
//         })
//     ],
//
//     // ESLint options
//     eslint: {
//         configFile: '.eslintrc',
//         failOnWarning: false,
//         failOnError: true
//     },
//
//     module: {
//         // Runs before loaders
//         preLoaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'eslint'
//             }
//         ],
//         // loaders handle the assets, like transforming sass to css or jsx to js.
//         loaders: [
//         {
//             test: /\.(jpe?g|png|gif|svg)$/i,
//             loaders: [
//                 'file?hash=sha512&digest=hex&name=[hash].[ext]',
//                 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
//             ]
//         },
//         {
//             test: /\.js?$/,
//             exclude: /node_modules/,
//             loader: 'babel'
//         }, {
//             test: /\.json?$/,
//             loader: 'json'
//         },
//         {
//             test: /\.css$/,
//             loader: 'style!css'
//         },
//         {
//             test: /\.scss$/,
//             // we extract the styles into their own .css file instead of having
//             // them inside the js.
//             loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
//         }, {
//             test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
//             loader: 'url?limit=10000&mimetype=application/font-woff'
//         }, {
//             test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
//             loader: 'file'
//         }]
//     },
//     postcss: [
//         require('autoprefixer')
//     ]
// };
