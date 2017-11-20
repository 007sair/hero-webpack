# loader

[官方文档](https://doc.webpack-china.org/concepts/loaders/)

## sass转换

``` bash
cnpm install style-loader css-loader sass-loader node-sass --save-dev
```

- `sass-loader`依赖于`node-sass`，所以需要安装`node-sass`
- `css-loader`使你能够使用类似`@import`和`url(…)`的方法实现`require()`的功能
- `style-loader`将所有的计算后的样式加入页面中；

``` js
//webpack3
module: {
    rules: [
        {
            test: /\.scss$/,
            // loader: 'style-loader!css-loader!sass-loader'  //这种方法会将样式以内联方式载入
            use: ExtractTextPlugin.extract({ //使用ExtractTextPlugin插件，可以生产css文件
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }
    ]
},
plugins: [
    new ExtractTextPlugin('style.css') //生成的css文件名称
]
```

## postcss

``` bash
cnpm install postcss-loader autoprefixer --save-dev
```

在`sass-loader`顺序之后引入postcss


## 图片转base64

参考：[file-loader 和 url-loader](http://blog.csdn.net/qq_38652603/article/details/73835153)

``` bash
cnpm install url-loader --save-dev
```

1. 文件大小小于limit参数，url-loader将会把文件转为DataURL
2. 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader

``` js
{
    test: /\.(png|jpg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'images/[name].[ext]?v=[hash:8]'
                //其他属性配置可以参考https://github.com/webpack-contrib/file-loader#options
            }
        }
    ]
    // loader: 'url-loader?limit=8192&name=images/[name].[ext]?v=[hash:8]',  //写法同上            
}
```

**踩坑：**

- `sass`文件中对图片的引用路径直接写入相对路径
- `webpack.config.js`中的`name=images/[name].[ext]?v=[hash:8]`表示输出目录