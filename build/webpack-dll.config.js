/**
 * 公共库 dll 打包
 */

require('./script/del-dist.js');
require('./script/del-dll.js');

var webpack = require('webpack');
var path = require('path');
var dirVars = require('./config/dir-vars.config.js');

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill',
            path.resolve(dirVars.rootDir, 'src/js/lib/zepto.js'),
            path.resolve(dirVars.rootDir, 'src/js/lib/rem750.js')
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
};