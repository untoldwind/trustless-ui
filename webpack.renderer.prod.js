const webpack = require('webpack');
const merge = require('webpack-merge');
const rendererConfig = require('./webpack.renderer.config');

module.exports = merge(rendererConfig, {
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
    ]
});