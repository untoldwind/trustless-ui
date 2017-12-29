const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'electron-renderer',
    entry: {
        app: [
            './src/renderer/app',
            './src/renderer/app.less',
            'semantic-ui-css/semantic.css'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    devServer: {
        port: 8000
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat',
            'create-react-class': 'preact-compat/lib/create-react-class'
        }
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
                use: 'file-loader'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/renderer/index.html.ejs',
            inject: 'body'
        })
    ],
}
