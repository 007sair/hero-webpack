
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssConfig = require('./postcss.config.js');

module.exports = {
    rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcssConfig,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1, //开发模式下不转换dataUrl
                        name: 'images/[name].[ext]?v=[hash:8]'
                    }
                }
            ]
        },
    ]
}