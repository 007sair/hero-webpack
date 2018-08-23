/**
 * 自动加载模块，而不必到处 import 或 require 
 * https://webpack.docschina.org/plugins/provide-plugin/
 */

/* ------------------------------------
 如果某个模块需要在不同的js中引用，可以把需要引用的模块写入下方插件内。
 例如：
 Vue需要在两个js文件中引用，如果不写入下方插件中，需要在两个js文件中分别 import Vue from 'vue'
 当我们写入后，全局就有了Vue，不需要分别进行引用
--------------------------------------*/

const webpack = require('webpack')
const path = require('path')
const dirVars = require('./dir-vars.config.js')

module.exports = [
    new webpack.ProvidePlugin({
        mu: path.resolve(dirVars.srcDir, 'js/lib/mu.js'),
        // Vue: 'vue',
        axios: 'axios',
    }),
]