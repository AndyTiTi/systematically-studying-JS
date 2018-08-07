const path = require('path');
const HtmlWebpachPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/index.js',
  output:{
    path:__dirname,
    filename:'./release/bundle.js'
  },
  module:{
    rules:[{
      test:/\.js?$/,
      exclude:/(node_modules)/,
      loader:'babel-loader'
    }]
  },
  plugins:[
    new HtmlWebpachPlugin({
      template:'./index.html'
    })
  ],
  devServer:{
    contentBase:path.join(__dirname,'./release'),
    open:true,
    port:9000
  }
}