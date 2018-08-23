/**
 * 别名配置
 */

const path = require('path')
const dirVars = require('./dir-vars.config.js')

module.exports = {
    alias: {
        '@': path.resolve(dirVars.srcDir),
        vue: 'vue/dist/vue.min.js'
    },
    extensions: ['.js', '.css', '.scss'],
}