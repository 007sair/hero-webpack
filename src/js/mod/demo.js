// Imports

// /build/config/provide.config.js文件下已全局引入，无需再单独引入
// import '@/js/lib/mu'
// console.log(mu)

let touch = function (ev, selector, fn) {
    return document.querySelector(selector).addEventListener(ev, fn)
}

/*---------- Mujs ----------*/

touch('click', '.btn-mujs', function (e) {
    mu.open({
        type: 'toast',
        content: '我是toast提示框',
        time: 1.5,
        animate: false,
        animate: 'up',
    });
})

let loader = null

touch('click', '.btn-loading', function (e) {
    loader = mu.loader('我是自定义文案');
})

touch('click', '.btn-loading-close', function (e) {
    mu.close(loader)
})


/*---------- async chunk ----------*/

touch('click', '.btn-chunk-a1', function (e) {
    require.ensure([], (require) => {
        require('./a1.js')
    }, 'a1.chunk')
})

/*---------- async await ----------*/

let isLoading = false

const sleep = function (name, time) {
    return new Promise((resolve, reject) => {
        console.time(name)
        setTimeout(() => {
            resolve(time)
            console.timeEnd(name)
        }, time);
    })
}

let loadAsync = async () => {
    isLoading = true
    console.log('开始执行异步')
    console.time('执行完毕, 总耗时')
    try {
        let t1 = await sleep('sleep1', 2000)
        await sleep('sleep2', 500)
        await sleep('sleep3', 1200)
    } catch (error) {
        console.log(error);
    } finally {
        isLoading = false
        console.timeEnd('执行完毕, 总耗时')
    }
}

touch('click', '.btn-aa', function () {
    if (!isLoading) {
        loadAsync()
    } else {
        mu.toast('加载中，请到控制台查看信息')
    }
})

/*---------- 发起请求 ----------*/

import Api from '@/js/mod/api'

touch('click', '.btn-request', async function () {
    try {
        const data = await Api.mock()
        console.log(data)
    } catch (error) {
        console.log(error)
        mu.toast(error.message)
    }
})
