/**
 * development
 */

require('./build/del.js');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event;

var dirVars = require('./build/dir-vars.config.js');
var _getEntry = require('./build/entry.config.js');
var _resolve = require('./build/resolve.config.js');
var _module = require('./build/module.config.js');
var _cleancss = require('./build/cleancss.config.js');

var config = {
    devtool: 'inline-source-map',
    entry: _getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "scripts/[name].js",
        publicPath: "/",
        chunkFilename: "scripts/[name].js"
    },
    devServer: {
        inline: true,
        port: 8099,
        host: '0.0.0.0', //局域网访问
        contentBase: "./dist/",  //本地服务器所加载的页面所在的目录
    },
    module: _module,
    resolve: _resolve,
    plugins: [
        new webpack.DefinePlugin({ //环境判断 用于js文件中
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
        }),
        new ExtractTextPlugin('css/style.css'),
    ]
};

//set pages
config.plugins = config.plugins.concat(
    require('./build/page.js'),
    _cleancss()
);

module.exports = config;