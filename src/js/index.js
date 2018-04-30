
// Lib
import 'babel-polyfill'
import '@/js/lib//rem750';

// Assets 
// 包含样式与图片资源引入
import '@/js/mod/assets'

// for HMR
if (__DEV__) require('@/index.html');

// 测试环境判断
if (__DEV__) {
    console.log('我是测试环境');
}

let touch = function (ev, selector, fn) {
    return document.querySelector(selector).addEventListener(ev, fn)
};

/*---------- Mujs ----------*/
import '@/js/lib/mu'
touch('click', '.btn-mujs', function (e) {
    mu.open({
        type: 'toast',
        content: '我是toast提示框',
        time: 1.5,
        animate: false,
        animate: 'up',
    });
})


/*---------- async chunk ----------*/
touch('click', '.btn-chunk-a1', function (e) {
    require.ensure([], (require) => {
        require('./mod/a1.js')
    }, 'a1.chunk')
})

touch('click', '.btn-chunk-a2', function (e) {
    require.ensure([], (require) => {
        require('./mod/a2.js')
    }, 'a2.chunk')
})


/*---------- async await ----------*/
let sleep1 = (time) => {
    return new Promise((resolve, reject) => {
        console.log(`${time}毫秒后执行 sleep1`);
        setTimeout(() => {
            console.log('sleep1');
            resolve(time)
        }, time);
    })
}

let sleep2 = (time, res) => {
    return new Promise((resolve, reject) => {
        console.log(`${time}毫秒后执行 sleep2`);
        setTimeout(() => {
            console.log('sleep2');
            resolve(time)
        }, time);
    })
}

let sleep3 = (time, res) => {
    return new Promise((resolve, reject) => {
        console.log(`${time}毫秒后执行 sleep3`);
        setTimeout(() => {
            console.log('sleep3');
            resolve(time)
        }, time);
    })
}

let run = async () => {
    try {
        console.log('开始执行异步');
        let r1 = await sleep1(2000)
        let r2 = await sleep2(1000, r1)
        let r3 = await sleep3(1500, r2)
        console.log('异步执行完毕');
    } catch (error) {
        console.log(error);
    }
}

touch('click', '.btn-aa', run)