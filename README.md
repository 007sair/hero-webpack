# 开发相关

``` bash
# 开发环境
npm run dev

# 生产环境
npm run build
```

**开发环境：**

开发环境不压缩js、css，没有合并雪碧图，没有转换base64

**生产环境：**

压缩js、css，合并雪碧图、转换base64


# webpack 笔记

[webpack中文文档](https://doc.webpack-china.org/)

## 相关命令

``` bash
#创建package.json文件
npm init

#安装webpack
#-save-dev 是指将包信息添加到devDependencies，表示你开发时依赖的包裹。 
#-save 是指将包信息添加到dependencies，表示你发布时依赖的包裹。
npm install webpack --save-dev

#查看webpack 版本信息
npm info webpack

#安装指定版本
npm install webpack@3.x

#运行
node_modules/.bin/webpack or webpack

#参数
webpack --config webpack.min.js  #另一份配置文件
webpack --display-error-details #显示异常信息
webpack --watch   #监听变动并自动打包
webpack -p    #压缩混淆脚本，这个非常非常重要！
webpack -d    #生成map映射文件，告知哪些模块被最终打包到哪里了
```

## 区别开发环境与测试环境

### 通过脚本命令设置

在`package.json`里面的`scripts`设置环境变量，注意`mac`与`windows`的设置方式不一样

```json
"scripts": {
    "mac": "export NODE_ENV=prod&&webpack -p --colors",
    "win": "set NODE_ENV=prod&&webpack -p --colors"
}
```

在`webpack.config.js`使用`process.env.NODE_ENV`进行判断

### 使用插件定义变量

``` js
//webpack.config.js
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ]
};
```

`__DEV__`用于入口文件的js中，现在将环境变量传递给webpack

``` bash
#Linux & Mac
$ env DEBUG=true webpack-dev-server

#Windows-cmd
$ set DEBUG=true
$ webpack-dev-server

#Windows-powershell
$ $env:DEBUG='true'
$ webpack-dev-server
```

## 获取多页面入口

``` js
var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
    entry: getEntry(),
};
```

## package.json

`package.json`中的`script`会安装一定顺序寻找命令对应位置，本地的`node_modules/.bin`路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

`npm`的`start`命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用`npm start`就可以执行其对于的命令，如果对应的此脚本名称不是`start`，想要在命令行中运行时，需要这样用`npm run {script name}`如`npm run build`

## devtool选项

| devtool选项                  | 配置结果                                                                                                                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source-map                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；                                                                                                                                              |
| cheap-module-source-map      | 在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；                                                                                 |
| eval-source-map              | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项； |
| cheap-module-eval-source-map | 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；                                                                                                |


## 其他

- `__dirname`是`NodeJS`中的一个全局变量，它指向当前执行脚本所在的目录。

## DOC

- [webpack-dev-server](doc/webpack-dev-server.md)

## 参考

- [搜罗一切webpack的好文章好工具](https://github.com/webpack-china/awesome-webpack-cn)
- [webpack多页应用架构系列](https://segmentfault.com/a/1190000006843916)
- [webpack 教程资源收集](https://segmentfault.com/a/1190000005995267)
- [Webpack傻瓜式指南](https://zhuanlan.zhihu.com/p/20367175)
- [Express结合Webpack的全栈自动刷新](https://segmentfault.com/a/1190000004505747)
- [Webpack——令人困惑的地方](http://blog.csdn.net/a1104258464/article/details/51914450)
- [webpack 使用优化指南](http://www.cnblogs.com/yumeiqiang/p/5281170.html)
- [vue-cli中的webpack配置](https://segmentfault.com/a/1190000008779053)