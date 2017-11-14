var webpack = require('webpack');
var path = require('path');
const CompressionPlugin = require("compression-webpack-plugin")
const HTMLWebpackPlugin = require('html-webpack-plugin');

require('es6-promise').polyfill();

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, ''),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                minifyJS: true
            },
            inject: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ]
};