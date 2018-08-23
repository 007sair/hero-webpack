/**
 * 获取多页面的每个入口文件，用于配置中的entry
 */

const fs = require('fs')
const path = require('path')
const dirVars = require('./dir-vars.config.js')

module.exports = function () {
    var jsPath = path.resolve(dirVars.srcDir, 'js')
    var dirs = fs.readdirSync(jsPath)
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/)
        if (matchs) {
            files[matchs[1]] = path.resolve(dirVars.srcDir, 'js', item)
        }
    })
    return files
}