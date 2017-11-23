//style
import '../css/main.scss';

//scripts
import './lib/rem750.js';

if (__DEV__) {
    console.log('我是测试环境');
}

let arr = [1, 2, 3, 4, 5];
var double_arr = arr.map(n => n * 2);

console.log(double_arr);