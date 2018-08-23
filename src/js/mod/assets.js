/**
 * 导出图片资源为对象
 */

// 导出对象，key:目录+图片名称，value:图片路径+hash
let exportObj = {}

/**
 * 根据context 批量导入 @/assets/img/ 下的所有图片
 * 效果类似批量使用 require('@/assets/img/bgs/[1.png, 2.png, 3.png, ...]')
 * 注意：这种导出方式，导出的图片顺序有问题。
 * 如果对图片顺序有要求，需手动写数组
 */
function importAll(r) {
    if (__DEV__) {
        console.log('↓↓↓↓ 图片资源地址：↓↓↓↓');
    }
    r.keys().forEach(p => {
        let folder = p.replace(/(.*\/)*([^.]+).*/ig, "$1").replace('./', '');
        let name = p.replace(/(.*\/)*([^.]+).*/ig, "$2");
        let ext = '.' + p.replace(/.+\./, "");
        let all = require('@/assets/img/' + folder + name + ext)
        exportObj[folder+name] = all

        if (__DEV__) {
            console.log(folder + name, ':', all);
        }
    })
    if (__DEV__) {
        console.log('↑↑↑↑ 图片资源地址：↑↑↑↑');
    }
}

importAll(require.context('@/assets/img/', true, /\.*$/))


export default exportObj