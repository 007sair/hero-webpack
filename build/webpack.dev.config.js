/**
 * 开发环境 development
 */

require('./script/del-dist.js');

const path = require('path');
const webpack = require('webpack');

// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

const dirVars = require('./config/dir-vars.config.js');
const _getEntry = require('./config/entry.config.js');
const resolve_config = require('./config/resolve.config');
const module_config = require('./config/module.config')
const stats_config = require('./config/stats.config')

const PORT = 8080

let config = {
    devtool: 'inline-source-map',
    entry: _getEntry(),
    output: {
        path: path.resolve(dirVars.rootDir, 'dist'),
        filename: "js/[name].js",
        publicPath: "/", // 不设置时将使用相对路径
        chunkFilename: "js/[name].js"
    },
    devServer: {
        public: 'localhost:' + PORT,
        inline: true,
        open: true,
        port: PORT,
        hot: true,
        host: '0.0.0.0', // 不填时无法通过手机访问 
        stats: stats_config,
        // quiet: true, // 静默构建，不会在控制台输出任何信息
        contentBase: path.join(__dirname, 'dist'),  // 本地服务器所加载的页面所在的目录
    },
    module: module_config,
    resolve: resolve_config,
    plugins: [
        new webpack.DefinePlugin({ //环境判断 用于js文件中
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
        }),
        // webpack-dashboard
        // new DashboardPlugin(dashboard.setData)
    ]
}

// set pages
config.plugins = config.plugins.concat(
    require('./config/page.config.js'),
    require('./config/provide.config.js'),
)

module.exports = config