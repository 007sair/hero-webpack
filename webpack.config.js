require('./build/before-build.script.js')

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CleanCSS = require('clean-css');

//判断环境
var TARGET = process.env.npm_lifecycle_event;

console.log(TARGET);

// for compatibility with optimize-css-assets-webpack-plugin
CleanCSS.process = function (input, opts) {
    var cleanCss;
    var optsTo = opts.to;

    delete opts.to;
    cleanCss = new CleanCSS(Object.assign({ returnPromise: true, rebaseTo: optsTo }, opts));

    return cleanCss.minify(input)
        .then(function (output) {
            return { css: output.styles };
        });
};

//postcss config
var sprites = require('postcss-sprites');
var postcssConfig = require('./build/postcss.config.js');

postcssConfig.plugins.push(sprites({
    spritePath: './dist/images/', //生成的雪碧图存放路径
    spritesmith: {
        padding: 15
    },
    filterBy(image) { //过滤路径为 assets/sprites 下的图片
        if (!/\assets\/sprites/.test(image.url)) {
            return Promise.reject();
        }
        return Promise.resolve();
    }
}));

module.exports = {
    entry: __dirname + "/src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "scripts/bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
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
                                plugins: postcssConfig.plugins
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
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(), // 配合CLI的--bail，一出error就终止webpack的编译进程
        new ExtractTextPlugin('css/style.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: CleanCSS,
            cssProcessorOptions: {
                format: 'keep-breaks',
            },
            canPrint: true
        })
    ]
}
