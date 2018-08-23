// Lib
import 'babel-polyfill' // es6
import 'amfe-flexible'  // rem

/* 以下模块使用方法，参考：/build/config/provide.config.js */
// import Vue from 'vue'
// import $ from 'zepto'

// css、images资源的引入
import '@/css/main'
import oImages from '@/js/mod/assets'

// 测试环境判断
if (__DEV__) {
    require('@/index.html') /* FOR HMR */
	var VConsole = require('vconsole')
	new VConsole()
}

// 举个栗子
import '@/js/mod/demo'