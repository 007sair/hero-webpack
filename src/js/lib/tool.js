/**
 * Tools
 */

export default {

    // 唯一id
    uuid() {
        var d = new Date().getTime()
        var uuid = "xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (d + Math.random() * 16) % 16 | 0
                d = Math.floor(d / 16)
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16)
            }
        );
        return uuid
    },

    /**
     * 异步加载图片
     * @param {string}   url        图片地址
     * @param {boolean}  is_cors    是否对此元素的CORS请求设置凭据标志
     */
    loadImage(url, is_cors = true) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            if (is_cors) {
                img.crossOrigin = 'Anonymous'
            }
            img.onload = () => resolve(img)
            img.onerror = () => {
                reject(new Error('That image was not found.:' + url.length))
            }
            img.src = url
        })
    },

    /**
     * 批量加载图片，返回promise
     * 依赖 loadImage
     * @param {array}     urls      一组图片的url
     */
    batchLoadImage(urls) {
        return Promise.all(urls.map(url => this.loadImage(url)))
    },

    // 按顺序执行promise
    // tasks为数组，每项为一个返回promise的函数
    sequenceTasks(tasks) {
        function recordValue(results, value) {
            results.push(value);
            return results;
        }
        var pushValue = recordValue.bind(null, []);
        return tasks.reduce(function (promise, task) {
            return promise.then(task).then(pushValue);
        }, Promise.resolve());
    },

    /**
     * 根据参数名称 获取参数值
     * @param {string} name 参数名称
     */
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    /**
     * 异步插入script标签到dom中
     * @param {string}  src   脚本链接
     */
    injectScript(src, _async = true) {
        var s, t;
        s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        s.async = _async
        t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s, t);
    },

    log() {
        __DEV__ && console.log(...arguments)
    },

    // 压缩京东cdn图片
    compressCDN(img_url) {
        return img_url.replace('/jfs/', '/s100x100_jfs/')
    },

    /**
     * 对象转参数
     * @param {*} obj 
     */
    obj2str(obj) {
        return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
    },

    // 延迟几秒
    sleep(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('sleep end')
            }, time * 1000);
        })
    },

    // 将链接替换为https的 一般用于替换图片地址
    http2https(full_url) {
        if (full_url.match(/^http:\/\//)) {
            return full_url.replace('http://', 'https://')
        }
        return full_url
    },

    // 获取字符串长度，一个中文汉字的长度为2
    getRealLen(str) {
        return str.replace(/[^\x00-\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了
    },

    // 转化字节
    bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1024, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
       return parseInt((bytes / Math.pow(k, i)).toPrecision(3)) + sizes[i];
    },

}
