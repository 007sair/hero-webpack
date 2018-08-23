/**
 * 公共库 dll 打包
 */

require('./script/del-dll.js')
require('./script/del-dist.js')

const webpack = require('webpack')
const path = require('path')
const dirVars = require('./config/dir-vars.config.js')

module.exports = {
    entry: {
        vendor: [ // 指定要抽离的模块
            'amfe-flexible',
            'babel-polyfill',
            // 'vue',
            'axios'
        ],
    },
    output: {
        path: path.resolve(dirVars.rootDir, "dist/js/"),
        filename: '[name].min.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.DllPlugin({
            path: path.resolve(dirVars.rootDir, "manifest.json"),
            name: '[name]_library',
            context: dirVars.rootDir
        })
    ]
}