`hero`的`webpack`版本，原版本见[hero](https://github.com/007sair/hero)

## 命令

``` bash
# 开发环境
npm run dev

# 生产环境
#step1
npm run dll

#step2
npm run build
```

## 开发环境

区别于`hero`，`hero-webpack`的开发环境没有`dist`目录。

- 不打包压缩`js`、`css`
- 不处理雪碧图，见`main.scss`写法
- 不转换`base64`图片

## 生产环境

**第一次 or 修改过第三方脚本时，先执行dll命令，再进行build打包。**

### `npm run dll`

这个命令会构建出第三方库的依赖包`vendor.js`，包含`zepto.js`、`rem750.js`。

### `npm run build`

- 打包、压缩、抽离`js`
- 生成样式
- 生成雪碧图
- 处理`base64`
- 处理`svg`
- 给`.html`文件自动载入样式、载入3个js文件（`vendor.js`，`common.js`，`index.js`）

**关于build后生成的js文件**

- `vendor.js`，第三方库的打包文件
- `common.js`，抽离出重复使用的模块文件
- `index.js`，业务模块打包后的文件
