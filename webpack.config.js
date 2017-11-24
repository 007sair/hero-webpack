/**
 * production
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var dirVars = require('./build/dir-vars.config.js');
var _getEntry = require('./build/entry.config.js');
var _resolve = require('./build/resolve.config.js');
var _module = require('./build/module.config.js');

var config = {
    entry: _getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist'),
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
        new ExtractTextPlugin('css/style.css'),
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
            context: __dirname,
            manifest: require(path.resolve(__dirname, "manifest.json")),
        }),
    ]
};

//set pages
config.plugins = config.plugins.concat(
    require('./build/page.js')
);

module.exports = config;