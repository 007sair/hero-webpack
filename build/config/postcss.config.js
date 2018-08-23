// plugins
const postuse = require('postcss-use')
const postshort = require('postcss-short')
const cssnext = require("postcss-cssnext") //http://cssnext.io/features/
const sprites = require('postcss-sprites')
const stylefmt = require('stylefmt')
const cssnano = require('cssnano')

// 判断环境 dev or build
const TARGET = process.env.npm_lifecycle_event

let config = [
    cssnext({
        browsers: ['iOS >= 6', 'Android >= 4.0'],
        warnForDuplicates: false // 禁用重复插件的warning
    }),
    postuse({ // 便于在.scss文件中直接使用
        modules: ['postcss-pxtorem']
    }),
    postshort({
        position: {
            skip: '_', // 默认*号跳过，改为'_'下划线是因为*号跳过在scss中会进行乘法运算
            prefix: 's' // 只识别前缀为-s-的属性，因为position:-webkit-sticky有冲突
        },
        spacing: {
            skip: '_'
        }
    }),
    cssnano({
        preset: ['default']
    }),
    sprites({ // 雪碧图插件
        spritePath: './dist/images/', // 生成的雪碧图存放路径
        spritesmith: {
            padding: 15
        },
        filterBy(image) { // 过滤路径为 assets/sprites 下的图片
            if (!/\assets\/sprites/.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    })
];

// dev模式下格式化css
if (TARGET === 'dev') {
    config.push(stylefmt)
}


module.exports = config;