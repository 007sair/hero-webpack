# postcss plugins

## postcss-sprites

``` bash
#install
cnpm i postcss-sprites postcss -D
```

``` js
//webpack.config.js
var postcss = require('postcss');
var sprites = require('postcss-sprites');
var updateRule = require('postcss-sprites/lib/core').updateRule;

sprites({
    spritePath: './dist/images/', //生成的雪碧图存放路径
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
```

## postcss-lazysprite

- 优点：支持增量更新，可以按文件夹分组雪碧图
- 缺点：1倍图不支持`background-size`、2倍图又没有`width`、`height`

``` bash
#install
cnpm i postcss-lazysprite -D
```

``` js
//webpack.config.js
var lazysprite = require('postcss-lazysprite');

lazysprite({
    imagePath:'./src/assets/sprites', //雪碧图小图所在目录；
    stylesheetInput: './src/css', //CSS 文件所在的目录，一般与gulp.src的路径相关；
    stylesheetRelative: './dist/css', //为了在生成的CSS 中构造相对路径而引入，一般与gulp.dest的路径相关；
    spritePath: '../images', //生成的雪碧图放置的目录；
    smartUpdate: true, //是否启用智能更新机制
    nameSpace: 'icon-', //CSS 的命名空间
})
```

``` css
/* main.scss or css */
/* postcss-lazysprite */
@lazysprite "groupon"; /* 表示  ./src/assets/sprites/groupon 目录 */
```


## 参考

- [如何使用 PostCSS 在样式表中处理图片](http://blog.csdn.net/yita90/article/details/51564118)