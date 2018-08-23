/**
 * Copy files to release dir
 * ```js
 * shell.mkdir('-p', 'dist/css/lib')
 * shell.rm('-rf', 'dist/css/lib')
 * shell.cp('-R', 'static/lib', 'dist/css/lib');
 * console.log('>>> 已复制文件 dist/css/lib 目录');
 * ```
 */

const shell = require("shelljs")
