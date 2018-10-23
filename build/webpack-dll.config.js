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
            
            /**
             * 注意：这里没有写成vue是因为vue是通过alias的别名得来，
             * 而webpack.dll.config.js并不知道vue指代的是'vue/dist/vue.min.js'，
             */
            // 'vue/dist/vue.min.js',
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