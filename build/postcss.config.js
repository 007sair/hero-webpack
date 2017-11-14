var pxtorem = require('postcss-pxtorem');
var postuse = require('postcss-use');
var postshort = require('postcss-short');
var cssnext = require("postcss-cssnext"); //http://cssnext.io/features/

var postcss = require('postcss');
var sprites = require('postcss-sprites');
var updateRule = require('postcss-sprites/lib/core').updateRule;

module.exports = {
    plugins: () => [
        cssnext({ browsers: ['iOS >= 6', 'Android >= 4.0'] }),
        postuse({ //便于在.scss文件中直接使用
            modules: ['postcss-pxtorem']
        }),
        postshort({
            position: {
                skip: '_',  //默认*号跳过，改为'_'下划线是因为*号跳过在scss中会进行乘法运算
                prefix: 's' //只识别前缀为-s-的属性，因为position:-webkit-sticky有冲突
            },
            spacing: {
                skip: '_'
            }
        }),
        sprites({
            spritePath: '../images/', //生成的雪碧图存放路径
            filterBy: function(image) { //过滤路径为 assets/sprites 下的图片
                if (!/\assets\/sprites/.test(image.url)) {
                    return Promise.reject();
                }
                return Promise.resolve();
            },
            spritesmith: {
                padding: 15
            },
            hooks: {
                onUpdateRule: function(rule, token, image) {
                    // Use built-in logic for background-image & background-position
                    updateRule(rule, token, image);
        
                    //支持宽高
                    ['width', 'height'].forEach(function(prop) {
                        var value = image.coords[prop];
                        if (image.retina) {
                            value /= image.ratio;
                        }
                        rule.insertAfter(rule.last, postcss.decl({
                            prop: prop,
                            value: value + 'px'
                        }));
                    });
                }
            }
        })
    ],
}