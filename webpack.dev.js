/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const devConf = {
    mode: 'development',
    optimization: {},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'src/img', to: './img' }],
        }),
    ],
};

module.exports = merge(common, devConf);
