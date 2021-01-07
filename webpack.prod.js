/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

function collectSafelist() {
    return {
        greedy: [
            /^animate__animated/,
            /^animate__fadeOutRight/,
            /^animate__fadeInLeft/,
        ],
    };
}

const prodConf = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    ecma: 5,
                    mangle: true,
                    format: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin({
                parallel: true,
                sourceMap: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: '> 0.25%, not dead' },
                            ],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true,
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: false },
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].[fullhash].bundle.css',
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            safelist: collectSafelist,
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/img', to: './img' }],
        }),
    ],
};

module.exports = merge(common, prodConf);
