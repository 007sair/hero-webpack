/**
 * development
 */

require('./script/del-dist.js');

var path = require('path');
var webpack = require('webpack');

var TARGET = process.env.npm_lifecycle_event;

var dirVars = require('./config/dir-vars.config.js');
var _getEntry = require('./config/entry.config.js');
var _resolve = require('./config/resolve.config.js');
var postcssConfig = require('./config/postcss.config.js');

var config = {
    devtool: 'inline-source-map',
    entry: _getEntry(),
    output: {
        path: path.resolve(dirVars.rootDir, 'dist'),
        filename: "js/[name].js",
        publicPath: "/",
        chunkFilename: "js/[name].js"
    },
    devServer: {
        inline: true,
        open: true,
        port: 8099,
        hot: true,
        host: '0.0.0.0', //不填时无法通过手机访问 
        // contentBase: "../dist/",  //本地服务器所加载的页面所在的目录
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcssConfig,
                            sourceMap: true
                        }
                    },
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            name: 'images/[name].[ext]?v=[hash:8]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: _resolve,
    plugins: [
        new webpack.DefinePlugin({ //环境判断 用于js文件中
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
        })
    ]
};

//set pages
config.plugins = config.plugins.concat(
    require('./config/page.config.js'),
);

module.exports = config;