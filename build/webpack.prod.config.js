/**
 * 生产环境 production
 */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
// const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")

const dirVars = require('./config/dir-vars.config.js')
const entry_config = require('./config/entry.config.js')
const resolve_config = require('./config/resolve.config.js')
const module_config = require('./config/module.config')

let config = {
    entry: entry_config(),
    output: {
        path: path.resolve(dirVars.distDir),
        filename: "js/[name].min.js?v=[chunkhash:10]",
        publicPath: "/", // 如果不写，生成的资源路径为相对路径
        chunkFilename: "js/[name].min.js"
    },
    module: module_config,
    resolve: resolve_config,
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
            assets: ['js/vendor.min.js'],
            files: '*.html',
            append: false,
            hash: true
        }),
        new webpack.DllReferencePlugin({
            context: dirVars.rootDir,
            manifest: require(path.resolve(dirVars.rootDir, "manifest.json")),
        }),
        // new CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2
        // }),
    ]
}

// set pages
config.plugins = config.plugins.concat(
    require('./config/page.config.js'),
    require('./config/provide.config.js'),
)

module.exports = config