const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'electron-main',
    entry: [
        './src/main/main'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //   'process.env': {
        //     NODE_ENV: JSON.stringify('production')
        //   }
        // }),
        new CopyWebpackPlugin([
            { from: './src/main/app-package.json', to: path.join(__dirname, 'build', 'package.json') }
        ])
    ],
    node: {
        __dirname: false,
        __filename: false
    }
}