var path = require('path');
var dirVars = require('./dir-vars.config.js');

module.exports = {
    alias: {
        'Lib': path.resolve(dirVars.srcDir, './scripts/lib'),
        'Mod': path.resolve(dirVars.srcDir, './scripts/mod'),
        'CSS': path.resolve(dirVars.srcDir, './css')
    }
}