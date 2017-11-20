//引入脚本
require('./build/before-build.script.js');
var dirVars = require('./build/dir-vars.config.js');

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//postcss config
var postcssConfig = require('./build/postcss.config.js');

module.exports = {
    devtool: 'inline-source-map',
    entry: __dirname + "/src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "scripts/bundle.js",
        publicPath: "/"
    },
    devServer: {
        inline: true,
        port: 8099,
        contentBase: "./dist/",  //本地服务器所加载的页面所在的目录
    },
    module: {
        rules: [
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
                                plugins: postcssConfig.plugins,
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
    },
    resolve: {
        alias: {
            'Lib': path.resolve(dirVars.srcDir, './scripts/lib'),
            'Mod': path.resolve(dirVars.srcDir, './scripts/mod'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({ //环境判断 用于js文件中
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('css/style.css')
    ]
}
