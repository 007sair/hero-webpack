//style
import 'CSS/main.scss';

//scripts
import 'Lib/rem750.js';

if (__DEV__) {
    console.log('我是测试环境');
}

let arr = [1, 2, 3, 4, 5];
let double_arr = arr.map(n => n * 2);

console.log(double_arr);