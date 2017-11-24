/**
 * 公共库 dll 打包
 */

require('./build/before-build.script.js')

var webpack = require('webpack');
var path = require('path');
var dirVars = require('./build/dir-vars.config.js');

module.exports = {
    entry: {
        vendor: [
            path.resolve(dirVars.rootDir, 'src/scripts/lib/zepto.js'),
            path.resolve(dirVars.rootDir, 'src/scripts/lib/rem750.js')
        ],
    },
    output: {
        path: path.resolve(dirVars.rootDir, "dist/scripts/"),
        filename: '[name].js',
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
            context: __dirname
        })
    ]
};