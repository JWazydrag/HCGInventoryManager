module.exports = function (api) {
    // This caches the Babel config by environment.
    api.cache.using(() => process.env.NODE_ENV);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './app/components',
                        '@screens': './app/screens',
                        '@utils': './app/utils',
                        '@contexts': './app/contexts',
                        '@config': './app/config',
                        '@assets': './app/assets',
                        '@types': './app/types',
                    },
                },
            ],
        ],
    };
};
