var path = require('path');
let webpack = require('webpack');

module.exports = {
    entry:  './frontend/app.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'public')
    },

    watch: true,
    devtool: 'source-map',

    module: {
        rules: [
            {
                test:/\.html$/,
                use: {
                    loader: 'raw-loader',
                }

            }

        ]
    },
};