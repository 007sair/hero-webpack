# property

## 变量

- `__dirname`是`NodeJS`中的一个全局变量，它指向当前执行脚本所在的目录。

## 属性

``` js
module.exports = {
    devtool: 'eval-source-map', //见下方

    // 配置需要打包的入口文件，值可以是字符串、数组、对象。
    // 1. 字符串： entry： './entry'
    // 2. 字符串： entry：[ './entry1','entry2'] (多入口)
    // 3. 对象：   entry： {alert/index': path.resolve(pagesDir, `./alert/index/page`)}
    // 多入口书写的形式应为object，因为object,的key在webpack里相当于此入口的name,
    entry: __dirname + "/src/scripts/index.js",

    output: {
        // 输出文件配置，output 输出有自己的一套规则，常用的参数基本就是这三个
        // path: 表示生成文件的根目录 需要一个**绝对路径** path仅仅告诉Webpack结果存储在哪里
        path: path.resolve(__dirname, 'dist'),

        // filename 属性表示的是如何命名出来的入口文件，规则是一下三种： 
        // [name] 指代入口文件的name，也就是上面提到的entry参数的key，因此，我们可以在name里利用/，即可达到控制文件目录结构的效果。
        // [hash]，指代本次编译的一个hash版本，值得注意的是，只要是在同一次编译过程中生成的文件，这个[hash].js 
        //的值就是一样的；在缓存的层面来说，相当于一次全量的替换。
        filename: "scripts/bundle.js",

        // publicPath 参数表示的是一个URL 路径（指向生成文件的跟目录），用于生成css/js/图片/字体文件
        // 等资源的路径以确保网页能正确地加载到这些资源.
        // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值.
        // 例如，在localhost（即本地开发模式）里的css文件中边你可能用“./test.png”这样的url来加载图片，
        // 但是在生产模式下“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu上边的。
        // 这就意味着在生产环境你必须手动更新所有文件里的url为CDN的路径。
        //开发环境：Server和图片都是在localhost（域名）下
        //.image { 
        // background-image: url('./test.png');
        //}
        // 生产环境：Server部署下HeroKu但是图片在CDN上
        //.image { 
        //  background-image: url('https://someCDN/test.png');
        //}
        publicPath: "/"
    },
    devServer: {
        inline: true,
        port: 8099
    },
    module: {

        // webpack拥有一个类似于插件的机制，名为Loader，通过Loader，webpack能够针对每一种特定的资源做出相应的处理
        // 1.test参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。
        // 2.exclude参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。
        // 3.include参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。
        // 而include参数则用来指示目录；注意同时使用这两者的时候，实际上是and的关系。
        // 4.loader/loaders参数，用来指示用哪个或哪些loader来处理目标资源，这俩货
        // 表达的其实是一个意思，只是写法不一样，我个人推荐用loader写成一行，多个
        // loader间使用!分割，这种形式类似于管道的概念，又或者说是函数式编程。形
        // 如loader: 'css?!postcss!less'，可以很明显地看出，目标资源先经less-loader
        // 处理过后将结果交给postcss-loader作进一步处理，然后最后再交给css-loader。
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                // minimize: true // css压缩
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: postcssConfig
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]?v=[hash:8]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: path.resolve('./src/assets/svg'),
                options: {
                    extract: true,
                    spriteFilename: 'icon-svg.svg'
                }
            }   
        ]
    },

    // 用来配置依赖文件的匹配，如依赖文件的别名配置、模块的查找目录、默认查找的
    // 文件后缀名
    // resolve.root 该选型用来制定模块查找的根路径，必须为**绝对路径**，值可以
    // 是路径字符串或者路径数组若是数组，则会依次查找
    resolve: {

        // 用来配置依赖文件的别名，值是一个对，该对象的键是别名，值是实际路径
        alias: {
            'Lib': path.resolve(__dirname, './src/scripts/lib'),
            'Mod': path.resolve(__dirname, './src/scripts/mod'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('css/style.css'),
        new SpriteLoaderPlugin()
    ]
}
```

## devtool选项

| devtool选项                  | 配置结果                                                                                                                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source-map                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；                                                                                                                                              |
| cheap-module-source-map      | 在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；                                                                                 |
| eval-source-map              | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项； |
| cheap-module-eval-source-map | 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；                                                                                                |

