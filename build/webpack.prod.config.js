/**
 * production
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var dirVars = require('./config/dir-vars.config.js');
var _getEntry = require('./config/entry.config.js');
var _resolve = require('./config/resolve.config.js');
var _module = require('./config/module.config.js');

var config = {
    entry: _getEntry(),
    output: {
        path: path.resolve(dirVars.rootDir, "dist"),
        filename: "scripts/[name].min.js?v=[chunkhash:10]",
        publicPath: "/",
        chunkFilename: "scripts/[name].min.js"
    },
    module: _module,
    resolve: _resolve,
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(), // 配合CLI的--bail，一出error就终止webpack的编译进程
        new ExtractTextPlugin('css/style.css?v=[chunkhash:10]'),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['scripts/vendor.min.js'],
            files: '*.html',
            append: false,
            hash: true
        }),
        new CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new webpack.DllReferencePlugin({
            context: dirVars.rootDir,
            manifest: require(path.resolve(dirVars.rootDir, "manifest.json")),
        })
    ]
};

//set pages
config.plugins = config.plugins.concat(
    require('./config/page.config.js'),
);

module.exports = config;