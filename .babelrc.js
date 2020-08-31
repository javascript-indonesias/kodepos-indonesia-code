module.exports = {
    presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
    ],
};
