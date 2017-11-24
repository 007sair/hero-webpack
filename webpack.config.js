var dirVars = require('./build/dir-vars.config.js');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

//postcss config
var postcssConfig = require('./build/postcss.config.js');

//获取多页面的每个入口文件，用于配置中的entry
var fs = require('fs');
function getEntry() {
    var jsPath = path.resolve(dirVars.srcDir, 'scripts');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(dirVars.srcDir, 'scripts', item);
        }
    });
    return files;
}

module.exports = {
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "scripts/[name].js?v=[chunkhash:10]",
        publicPath: "/",
        chunkFilename: "scripts/[name].js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssConfig
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]?v=[hash:8]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'Lib': path.resolve(__dirname, './src/scripts/lib'),
            'Mod': path.resolve(__dirname, './src/scripts/mod'),
        }
    },
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
            assets: ['scripts/vendor.js'],
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['common', 'index']
        })
    ]
}
