/**
 * 路径对象
 */

const path = require('path')

const dirs = {}

dirs.rootDir = path.resolve(__dirname, '../../')

// 源代码目录
dirs.srcDir = path.resolve(dirs.rootDir, 'src')

// 构建生成目录
dirs.distDir = path.resolve(dirs.rootDir, 'dist')

module.exports = dirs