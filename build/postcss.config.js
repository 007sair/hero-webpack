var pxtorem = require('postcss-pxtorem');
var postuse = require('postcss-use');
var postshort = require('postcss-short');
var cssnext = require("postcss-cssnext"); //http://cssnext.io/features/

module.exports = {
    plugins: [
        cssnext({
            browsers: ['iOS >= 6', 'Android >= 4.0'],
            warnForDuplicates: false //禁用重复插件都提示
        }),
        postuse({ //便于在.scss文件中直接使用
            modules: ['postcss-pxtorem']
        }),
        postshort({
            position: {
                skip: '_', //默认*号跳过，改为'_'下划线是因为*号跳过在scss中会进行乘法运算
                prefix: 's' //只识别前缀为-s-的属性，因为position:-webkit-sticky有冲突
            },
            spacing: {
                skip: '_'
            }
        }),
        require('postcss-inline-svg') //todo: postcss-svgo
    ],
};