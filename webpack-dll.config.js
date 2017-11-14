
require('./build/before-build.script.js')

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

//postcss config
var postcssConfig = require('./build/postcss.config.js');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "scripts/bundle.js",
        publicPath: "/"
    },
    devServer: {
        inline: true,
        port: 8099
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
                                // minimize: true // css压缩
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: postcssConfig
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
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: path.resolve('./src/assets/svg'),
                options: {
                    extract: true,
                    spriteFilename: 'icon-svg.svg'
                }
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('css/style.css'),
        new SpriteLoaderPlugin()
    ]
}
