# plugin

## clean-css

优化css格式的插件

``` bash
#install
cnpm i clean-css optimize-css-assets-webpack-plugin -D
```

``` js
//webpack.config.js
const CleanCSS = require('clean-css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// for compatibility with optimize-css-assets-webpack-plugin
CleanCSS.process = function (input, opts) {
    var cleanCss;
    var optsTo = opts.to;

    delete opts.to;
    cleanCss = new CleanCSS(Object.assign({ returnPromise: true, rebaseTo: optsTo }, opts));

    return cleanCss.minify(input)
        .then(function (output) {
            return { css: output.styles };
        });
};

module.exports = {
	plugins: [
		new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: CleanCSS,
            cssProcessorOptions: {
                format: 'keep-breaks',
            },
            canPrint: true
        })
	]
}
```

## webpack-spritesmith

这是一个生产雪碧图的webpack插件

``` bash
#install
cnpm install webpack-spritesmith -D
```

``` js
var SpritesmithPlugin = require('webpack-spritesmith');

plugins: [
    new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, 'src/assets/sprites/groupon'),
            glob: '*.png'
        },
        target: {
            image: path.resolve(__dirname, 'dist/images/sprite.png'),
            css: [
                [path.resolve(__dirname, 'src/css/_sprites.scss'), {
                    format: 'scss_template_handlebars'
                }]
            ]
        },
        apiOptions: {
            cssImageRef: "/images/sprite.png"
        },
        customTemplates: { //自定义模板
            'scss_template_handlebars': path.resolve(__dirname, 'build/scss.template.handlebars')
        },
    }),
]
```

以下为`scss.template.handlebars`模板修改后的内容

``` handlebars
{
  // Default options
  'functions': true,
  'variableNameTransforms': ['dasherize']
}

{{#block "sprites-comment"}}
/*
scss变量包含了icon的编译状态信息，存储在各自icon命名的变量下。
例如，一张名为icon-home.png的图标：
.icon-home {
	width: $icon-home-width;
}

大型数组变量包含了单个图标的所有信息，例如：
$icon-home: x y offset_x offset_y width height total_width total_height image_path name;

在本节的底部，我们提供有关spritesheet本身的信息：
$spritesheet: width height image $spritesheet-sprites;
*/
{{/block}}
{{#block "sprites"}}
{{#each sprites}}
${{strings.name_name}}: '{{name}}';
${{strings.name_x}}: {{px.x}};
${{strings.name_y}}: {{px.y}};
${{strings.name_offset_x}}: {{px.offset_x}};
${{strings.name_offset_y}}: {{px.offset_y}};
${{strings.name_width}}: {{px.width}};
${{strings.name_height}}: {{px.height}};
${{strings.name_total_width}}: {{px.total_width}};
${{strings.name_total_height}}: {{px.total_height}};
${{strings.name_image}}: '{{{escaped_image}}}';
${{strings.name}}: ({{px.x}}, {{px.y}}, {{px.offset_x}}, {{px.offset_y}}, {{px.width}}, {{px.height}}, {{px.total_width}}, {{px.total_height}}, '{{{escaped_image}}}', '{{name}}', );
{{/each}}
{{/block}}
{{#block "spritesheet"}}
${{spritesheet_info.strings.name_width}}: {{spritesheet.px.width}};
${{spritesheet_info.strings.name_height}}: {{spritesheet.px.height}};
${{spritesheet_info.strings.name_image}}: '{{{spritesheet.escaped_image}}}';
${{spritesheet_info.strings.name_sprites}}: ({{#each sprites}}${{strings.name}}, {{/each}});
${{spritesheet_info.strings.name}}: ({{spritesheet.px.width}}, {{spritesheet.px.height}}, '{{{spritesheet.escaped_image}}}', ${{spritesheet_info.strings.name_sprites}}, );
{{/block}}

{{#block "sprite-functions-comment"}}
{{#if options.functions}}
/*
以下mixins旨在与数组类型变量一起使用，也可单独使用！
.icon-home {
	@include sprite-width($icon-home);
}

.icon-email {
	@include sprite($icon-email);
}
*/
{{/if}}
{{/block}}
{{#block "sprite-functions"}}
{{#if options.functions}}
@mixin sprite-width($sprite) {
	width: nth($sprite, 5);
}

@mixin sprite-height($sprite) {
	height: nth($sprite, 6);
}

@mixin sprite-position($sprite) {
	$sprite-offset-x: nth($sprite, 3);
	$sprite-offset-y: nth($sprite, 4);

	/* 
	将定位换成百分比单位
	background-position百分比单位
	参考自：https://github.com/banricho/webLog/issues/1
	*/
	$offset_x: nth($sprite, 3);
	$offset_y: nth($sprite, 4);
	$width: nth($sprite, 5);
	$height: nth($sprite, 6);
	$total_width: nth($sprite, 7);
	$total_height: nth($sprite, 8);

	//分母为0时让其为1rem（解决除法分母为0时报错问题）
	$x_fm: if( (($width - $total_width) == 0) , 1rem, ($width - $total_width));
	$y_fm: if( (($height - $total_height) == 0) , 1rem, ($height - $total_height));

	background-position: percentage($offset_x / $x_fm) percentage($offset_y / $y_fm);

	/* rem单位 */
	//background-position: $sprite-offset-x  $sprite-offset-y;
}

@mixin sprite-image($sprite, $url: '{{{spritesheet.escaped_image}}}') {
	background-image: url(#{$url});
	background-size: {{spritesheet.px.width}} {{spritesheet.px.height}};
}

@mixin sprite($sprite, $url: '{{{spritesheet.escaped_image}}}') {
	@include sprite-image($sprite, $url);
	@include sprite-position($sprite);
	@include sprite-width($sprite);
	@include sprite-height($sprite);
}

{{/if}}
{{/block}}

{{#block "spritesheet-functions-comment"}}
{{#if options.functions}}
/*
sprites混合器会直接生成样式，也能在scss内部被调用：
@include sprites($spritesheet-sprites, $url);
用法：
@param $spritesheet-sprites 	数组类型，所有图标命名的变量集合
@param $url  					图片地址，默认可不传入，使用gulp生成的路径，也可从外部传入自定义路径
$url使用场景：
	$online: true; 	//定义一个变量，标识当前使用环境 false or true
	$sprite-icons: '../images/icon-sprite.png'; //图标地址变量，默认值为gulp生成的
	@if $online { //如果是线上，将图标地址变量重新赋值
		$sprite-icons: 'http://xxx.xxx.icon-sprite.png'; //线上链接
	}
	//再将图标地址变量当第二个参数传入即可
	@include sprites($spritesheet-sprites, $sprite-icons);
*/
{{/if}}
{{/block}}
{{#block "spritesheet-functions"}}
{{#if options.functions}}
@mixin sprites($sprites, $url: '{{{spritesheet.escaped_image}}}') {
	%sprite-common { //提取图标样式公共代码
		background-image: url(#{$url});
		background-size: {{spritesheet.px.width}} {{spritesheet.px.height}};
	}
	@each $sprite in $sprites { //遍历每个图标，生成图标样式
		$sprite-name: nth($sprite, 10);
		.#{$sprite-name} {
			@extend %sprite-common;
			@include sprite-width($sprite);
			@include sprite-height($sprite);
			@include sprite-position($sprite);
		}
	}
}
{{/if}}
{{/block}}
```