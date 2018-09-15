module.exports = {
    presets: [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                modules: false,
                shippedProposals: true,
                loose: true,
            },
        ],
        '@babel/typescript',
    ],
    plugins: ['@babel/plugin-transform-runtime'],
    env: {
        test: {
            presets: [
                [
                    '@babel/env',
                    {
                        useBuiltIns: 'usage',
                        modules: 'commonjs',
                        shippedProposals: true,
                        loose: true,
                        targets: {
                            node: true,
                        },
                    },
                ],
            ],
        },
    },
};
