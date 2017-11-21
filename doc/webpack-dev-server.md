# webpack 热更新笔记

`webpack-dev-server`是一个小型的`Node.js Express`服务器,它使用`webpack-dev-middleware`来服务于webpack的包,除此自外，它还有一个通过Sock.js来连接到服务器的微型运行时

`webpack-dev-middleware`是webpack的一个中间件。它用于在`Express`中分发需要通过webpack编译的文件。单独使用它就可以完成代码的热重载（hot reloading）功能。

`webpack-dev-middleware`特性：

- 不会在硬盘中写入文件，完全基于内存实现。
- 如果使用 watch 模式监听代码修改，Webpack 会自动编译，如果在 Webpack 编译过程中请求文件，Webpack dev middleware 会延迟请求，直到编译完成之后再开始发送编译完成的文件。

## 基础目录

`webpack-dev-server`默认会以当前目录为基本目录,除非你制定它。

``` bash
webpack-dev-server --content-base build/
```

上述命令是在命令行中执行的,它将build目录作为根目录.有一点需要注意的是:`webpack-dev-server`生成的包并没有放在你的真实目录中,而是放在了内存中.

## 自动刷新

`webpack-dev-server`支持两种模式来自动刷新页面.

- `iframe模式`，页面放在iframe中,当发生改变时重载
- `inline模式`，将webpack-dev-sever的客户端入口添加到包(bundle)中

两种模式都支持热模块替换(`Hot Module Replacement`).热模块替换的好处是只替换更新的部分,而不是页面重载.

### iframe模式

使用这种模式不需要额外的配置,只需要以下面这种URL格式访问即可

```
http://«host»:«port»/webpack-dev-server/«path»
```

例如：http://localhost:8080/webpack-dev-server/index.html.

### inline模式

inline模式下我们访问的URL不用发生变化,启用这种模式分两种情况:

1、当以命令行启动`webpack-dev-server`时,需要做两点：

- 在命令行中添加`--inline`命令
- 在`webpack.config.js`中添加`devServer:{ inline: true }`

2、当以`Node.js API`启动`webpack-dev-server`时,我们也需要做两点:

- 由于`webpack-dev-server`的配置中无`inline选项`,我们需要添加`webpack-dev-server/client?http://«path»:«port»/`到`webpack`配置的`entry`入口点中.
- 将`<script src="http://localhost:8080/webpack-dev-server.js"></script>`添加到html文件中

``` js
var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'build/',
    publicPath: "/assets/"
});
server.listen(8080);
```

在Node中运行上面的代码即可。

注意：webpack配置中的devSever配置项只对在命令行模式有效。

### 注意：

1. 命令行模式启动，增加`--hot`时，不需要在`entry`中再增加webpack-dev-server头

``` js
entry: [
    // 'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/dev-server',
    './src/entry/index.js'
],
```

2. 增加`--open`参数会自动打开浏览器，但停止脚本任务时此浏览器会**强制关闭**

```
"scripts": {
    "start": "./node_modules/.bin/webpack-dev-server --open --hot",
},
```


## URL

- [Webpack——解决疑惑,让你明白](http://www.jianshu.com/p/dcb28b582318)
- [Webpack入门之遇到的那些坑](http://www.jianshu.com/p/02380e5deb38)
- [webpack踩坑之路 (2)——图片的路径与打包 ](http://www.cnblogs.com/ghost-xyx/p/5812902.html)
- [webpack多页应用架构系列](https://segmentfault.com/a/1190000006843916)
