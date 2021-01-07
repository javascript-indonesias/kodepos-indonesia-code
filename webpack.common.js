/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    optimization: {
        minimize: true,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 100000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    output: {
        filename: '[name].[fullhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]',
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            scriptLoading: 'defer',
            inject: 'body',
            favicon: './src/favicon.png',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4200,
        hot: false,
        liveReload: true,
        publicPath: '/',
        watchContentBase: true,
    },
};
