/**
 * 请求管理
 * `axios`已在`provide.config.js`中全局配置
 */

export  default {

    // test from http://rap2.taobao.org/repository/editor?id=70268
    base: 'http://rap2api.taobao.org/app/mock/70268',

    async mock() {
        try {
            let res = await axios({
                url: this.base + '/test_hero'
            })
            if (res.status == 200) {
                return res.data
            } else {
                throw new Error(res.statusText)
            }
        } catch (error) {
            throw error
        }
    }

}
