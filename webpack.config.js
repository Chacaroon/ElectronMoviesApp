const webpack = require('webpack')
const path    = require('path')

module.exports = {
    entry: {
        bundle: path.resolve('src', 'index.js')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ],
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}