/**
 * 快速排序
 * 这个版本还不够完善,空间复杂度太高
 * @param {array} 待排序数组
 * @returns {array} 排序后的数组
 */
quickSort = (array) => {
    if (array.length < 2) {
        return array
    }
    let pid = Math.floor(array.length / 2);
    let pivot = array.splice(pid, 1)[0];
    let left = []
    let right = []
    for (let i = 0; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i])
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

let array = [2, 1, 9, 4, 5, 8, 0]
console.log(quickSort(array))
