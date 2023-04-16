const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    cache: {
        type: 'filesystem'
    },
    mode: 'production',
    entry: './index.js',
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
            entryOnly: true
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin')
    }
};