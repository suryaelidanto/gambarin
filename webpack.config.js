const path = require('path');

module.exports = {
    target: 'node',
    cache: {
        type: 'filesystem'
    },
    mode: 'production',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin')
    }
};