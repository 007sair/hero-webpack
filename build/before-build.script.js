var fs = require('fs');
var rimraf = require('rimraf');
rimraf('dist', fs, function cb() {
    console.log('dist目录已清空');
});
