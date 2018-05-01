/**
 * production
 */

// require('./script/del-dist.js');

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
// const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var dirVars = require('./config/dir-vars.config.js');
var _getEntry = require('./config/entry.config.js');
var _resolve = require('./config/resolve.config.js');
var postcssConfig = require('./config/postcss.config.js');

var config = {
    entry: _getEntry(),
    output: {
        path: path.resolve(dirVars.rootDir, "dist"),
        filename: "js/[name].min.js?v=[chunkhash:10]",
        publicPath: "/", // 如果不写，生成的资源路径为相对路径
        chunkFilename: "js/[name].min.js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.(css|scss)$/,
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
            },
        ]
    },
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
};

//set pages
config.plugins = config.plugins.concat(
    require('./config/page.config.js'),
);

module.exports = config;