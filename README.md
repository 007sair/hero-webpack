# webpack 笔记

[webpack中文文档](https://doc.webpack-china.org/)

## 命令

```
#创建package.json文件
npm init

#安装webpack
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

## -save-dev 与 -save的区别 

- `-save-dev`是指将包信息添加到`devDependencies`，表示你开发时依赖的包裹。 
- `-save`是指将包信息添加到`dependencies`，表示你发布时依赖的包裹。 

## package.json

`package.json`中的`script`会安装一定顺序寻找命令对应位置，本地的`node_modules/.bin`路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

`npm`的`start`命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用`npm start`就可以执行其对于的命令，如果对应的此脚本名称不是`start`，想要在命令行中运行时，需要这样用`npm run {script name}`如`npm run build`

## devtool选项

|   devtool选项     | 配置结果 |
| ---------------- | ----- |
| source-map | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；|
| cheap-module-source-map | 在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；|
| eval-source-map | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；|
| cheap-module-eval-source-map | 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点； |


## 其他

- `__dirname`是`NodeJS`中的一个全局变量，它指向当前执行脚本所在的目录。

## DOC

- [webpack-dev-server](doc/webpack-dev-server.md)

## 参考

- [webpack多页应用架构系列](https://segmentfault.com/a/1190000006843916)
- [webpack 教程资源收集](https://segmentfault.com/a/1190000005995267)
- [Webpack傻瓜式指南](https://zhuanlan.zhihu.com/p/20367175)
- [Express结合Webpack的全栈自动刷新](https://segmentfault.com/a/1190000004505747)
- [Webpack——令人困惑的地方](http://blog.csdn.net/a1104258464/article/details/51914450)