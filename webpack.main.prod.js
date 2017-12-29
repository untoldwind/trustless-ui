const webpack = require('webpack');
const merge = require('webpack-merge');
const mainConfig = require('./webpack.main.config');

module.exports = merge(mainConfig, {
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
    ]
});