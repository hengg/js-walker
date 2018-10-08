/*观察下面的规律， 写一个函数accum
accum("abcd"); // "A-Bb-Ccc-Dddd"
accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt"); // "C-Ww-Aaa-Tttt"
*/
const repeat = (string, n) => {
    let upCase = string.toUpperCase()
    return upCase.concat(new Array(n + 1).join(string.toLowerCase()))
}
const accum = (string) => {
    // const array = string.split('')
    // let resluts = []
    // for (let i = 0; i < array.length; i++) {
    //     resluts.push(repeat(array[i], i))
    // }
    // return resluts.reduce((acc, item) => { return acc.concat(item) }, []).join('-')
    const array = Array.from(string);
    return array.reduce((acc, item, index) => {
        let str = item.toUpperCase().padEnd(index + 1, item.toLowerCase())
        return acc.concat(str)
    }, []).join('-')
}
// highAndLow("1 2 3 4 5"); // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"
const highAndLow = (string) => {
    const array = string.split(' ')
    for (let i = 0; i < array.length; i++) {
        let minId = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minId]) {
                minId = j
            }
        }
        [array[i], array[minId]] = [array[minId], array[i]]
    }
    return `${array[array.length - 1]} ${array[0]}`
}
// XO("ooxx") => true
// XO("xooxx") => false
// XO("ooxXm") => true
// XO("zpzpzpp") => true // 没有x也没有o，所有相等，都为0
// XO("zzoo") => false
const XO = (string) => {
    let array = Array.from(string)
    let x = array.filter(char => char.toUpperCase() === 'X').length
    let o = array.filter(char => char.toUpperCase() === 'O').length
    return x === o
}
// 写一个函数判断一个数字是不是某个整数的平方
const isSquare = (number) => {
    return Math.sqrt(number) === Math.floor(Math.sqrt(number))
}

const maskify = (string) => {
    // return string.length > 3 ?
    //     Array.from(string).reduce((acc, item, index) => {
    //         return index < string.length - 4 ? acc + '#' : acc + item
    //     }, '')
    //     : string
    return string.length > 4 ? string.slice(-4).padStart(string.length, '#') : string
}
/**
 * 三角数列求第N列相加之和
 * 1
 * 3 5
 * 7 9 11
 * 13 15 17 19
 * 21 23 25 27 29
 */
const sumOfRow = (n) => {
    if ((typeof n) !== 'number' || n <= 0) throw 'argument error';
    return Math.pow(n, 3);
}
/**
 * 将数字的每一位求平方，然后组合成新的数字
 */
const squareDigits = (number) => {
    if ((typeof number) !== 'number' || number < 0) throw 'argument error';
    return parseInt(Array.from(number + '').reduce((acc, item) => acc + Math.pow(parseInt(item), 2), ''));
}
/**
 * 求比一个数字n小的所有3和5的整数倍数和,如果输入负数，返回0
 * solution(10):比10小的3,5整数倍数有:3,5,6,9,所以和为23
 * solution(16):比16小的3,5整数倍数有:3,5,6,9,10,12,15,所以和为60,其中15只参与一次计算
 */
const solution = (number) => {
    if ((typeof number) !== 'number') throw 'argument error';
    if (number <= 0) {
        return 0
    } else {
        return Array(number).fill('').reduce((acc, v, i) => acc + (i % 3 === 0 || i % 5 === 0 ? i : 0), 0)
    }
}
/**
 * A是一个已排序的数组，x是目标值。
 * 如果找到目标值，返回目标值在数组中的序号。
 * 如果没有找到目标值，返回目标值应该被插入的位置
 */
const bsearch = (array, item) => {
    let low = 0;
    let high = array.length - 1;
    let index
    while (low <= high) {
        let mid = parseInt((low + high) / 2);
        if (item === array[mid]) {
            return mid;
        }
        if (item < array[mid]) {
            if (mid === 0 || array[mid - 1] < item) {
                index = mid
            }
            high = mid - 1;
        }
        else {
            if (mid === array.length - 1 || array[mid + 1] > item) {
                index = mid + 1
            }
            low = mid + 1;
        }
    }
    return index;
}
/**
 * 在一个数组中大部分都是奇数(或偶数），只有1个可能是偶数（或奇数），找到这个不一样的值
 */
const special = (arr) => {
    let evenArr = arr.filter(item => item % 2 === 0);
    let oddArr = arr.filter(item => item % 2 !== 0);
    return evenArr.length === 1 ? evenArr[0] : oddArr[0]
}

/**
 * 反转一个数组,不创建新数组
 */
const reverse = (array) => {
    for (let i = 0; i < array.length / 2; i++) {
        [array[i], array[array.length - 1 - i]] = [array[array.length - 1 - i], array[i]];
    }
    return array;
}
/**
 * 定义数组的旋转操作rotate(A, amount)，让数尾部amount个元素移动到头部。
 * 例如数组: A=[1,2,3,4,5,6,7]
 * rotate(A, 1) // [7,1,2,3,4,5,6]
 * rotate(A, 2) // [6,7,1,2,3,4,5]
 * rotate(A, 3) // [5,6,7,1,2,3,4]
 */
// const rotate = (A, amount) => {
//     let arr = A;
//     let temp = [];
//     for (let i = 0; i < amount; i++) {
//         temp.unshift(arr.pop());
//     }
//     return temp.concat(arr);
// }
const rotate = (A, amount) => {
    return A.slice(A.length - amount).concat(A.slice(0, A.length - amount))
}

/**
 * 递归版本的reverse
 * 分为问题为同类小问题:
 * 将数组分为两部分,首项为a0,其他项为others;将a0添加到others末尾,再递归处理others
 * 结束条件:数组长度为1
 */
const recursiveReverse = (array) => {
    if (array.length === 1) return array
    const [a0, ...others] = array;
    return [...recursiveReverse(others), a0]
}

module.exports = { squareDigits, sumOfRow, accum, maskify, XO, highAndLow, isSquare, solution, bsearch, special, reverse }
