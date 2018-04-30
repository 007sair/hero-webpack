var path = require('path');
var dirVars = require('./dir-vars.config.js');

module.exports = {
    alias: {
        '@': path.resolve(dirVars.srcDir)
    },
    extensions: ['.js', '.css', '.scss'],
}