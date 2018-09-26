/**
 * 实现如下函数
 * accum("abcd"); // "A-Bb-Ccc-Dddd"
 * accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
 * accum("cwAt"); // "C-Ww-Aaa-Tttt"
*/
const accum = (string) => {
    const array = Array.from(string);
    return array.reduce((acc, item, index) => {
        let str = item.toUpperCase().padEnd(index + 1, char.toLowerCase());
        return acc.concat(str);
    }, []).join('-');
}
// const repeat = (string, n) => {
//     let upCase = string.toUpperCase()
//     return upCase.concat(new Array(n + 1).join(string.toLowerCase()))
// }
// const accum = (string) => {
//     let resluts = []
//     for (let i = 0; i < array.length; i++) {
//         resluts.push(repeat(array[i], i))
//     }
//     return resluts.reduce((acc, item) => { return acc.concat(item) }, []).join('-')
// }
module.exports = accum;

/**
 * 实现如下函数,获取数字字符串的最大值和最小值
 * highAndLow("1 2 3 4 5"); // "5 1"
 * highAndLow("1 2 -3 4 5"); // "5 -3"
 * highAndLow("1 9 3 4 -5"); // "9 -5"
 */
// const highAndLow = (string) => {
//     const array = string.split(' ')
//     for (let i = 0; i < array.length; i++) {
//         let minId = i;
//         for (let j = i + 1; j < array.length; j++) {
//             if (array[j] < array[minId]) {
//                 minId = j
//             }
//         }
//         [array[i], array[minId]] = [array[minId], array[i]]
//     }
//     return `${array[array.length - 1]} ${array[0]}`
// }
const highAndLow = (string) => {
    const array = string.split(' ');
    array.sort((a, b) => a - b);
    return `${array[arr.length - 1]} ${array[0]}`;
}
module.exports = highAndLow;

/**
 * 实现如下函数,判断字符串内X与O的数量是否相等,忽略大小写
 * XO("ooxx") => true
 * XO("xooxx") => false
 * XO("ooxXm") => true
 * XO("zpzpzpp") => true
 */
const XO = (string) => {
    let array = Array.from(string);
    let x = array.filter(char => char.toUpperCase() === 'X').length;
    let o = array.filter(char => char.toUpperCase() === 'O').length;
    return x === o;
}
module.exports = XO;
/**
 * 判断一个数字是不是某个整数的平方
 * isSquare(2); // false 
 * isSquare(4); // true 
 */
const isSquare = (number) => {
    return Math.sqrt(number) === Math.floor(Math.sqrt(number));
}
module.exports = isSquare
/**
 * 将字符串除了最后的四位，其他都变成#
 * maskify("4556364607935616") == "############5616"
 * maskify("64607935616") == "#######5616"
 * maskify("1") == "1"
 * maskify("") == ""
 */
const maskify = (string) => {
    return string.length > 3 ?
        Array.from(string).reduce((acc, item, index) => {
            return index < string.length - 4 ? acc + '#' : acc + item
        }, '')
        : string
}
module.exports = maskify