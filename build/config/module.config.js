const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TARGET = process.env.npm_lifecycle_event;

const postcss_config = require('./postcss.config.js');

let css_loader_use = []

if (TARGET == 'dev') {
    css_loader_use = [
        'style-loader',
        'css-loader?sourceMap',
        {
            loader: 'postcss-loader',
            options: {
                plugins: postcss_config,
                sourceMap: true
            }
        },
        'sass-loader?sourceMap',
    ]
} else {
    css_loader_use = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: postcss_config,
                }
            },
            'sass-loader'
        ]
    })
}


let module_config = {
    rules: [
        {
            test: /\.(css|scss)$/,
            use: css_loader_use
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'images/[name].[ext]?v=[hash:8]'
                }
            }]
        },
        {
            test: /\.html$/,
            use: ['html-loader']
        },

        // polyfill for import zepto
        {
            test: require.resolve('zepto'),
            loader: 'exports-loader?window.Zepto!script-loader'
        }
    ]
}

module.exports = module_config