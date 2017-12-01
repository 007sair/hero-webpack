/**
 * 多页面入口模版
*/

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({ //page1
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['common', 'index']
    }),
    new HtmlWebpackPlugin({ //page2
        filename: 'page2.html',
        template: './src/page2.html',
        chunks: ['common', 'page2']
    })
];
