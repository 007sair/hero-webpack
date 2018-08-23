const path = require('path')
const shell = require("shelljs")
const dirVars = require('../config/dir-vars.config.js')

shell.rm("-rf", 'manifest.json')
console.log('> 已删除 manifest.json')

shell.rm("-rf", path.resolve(dirVars.distDir, 'js/vendor.min.js') )
console.log('> 已删除 dist/js/vendor.min.js')
