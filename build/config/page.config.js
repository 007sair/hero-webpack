/**
 * 多页面入口模版
*/

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [

    // page1
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['common', 'index']
    }),

    // page2 ...

];
