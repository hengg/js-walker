/**
 * 选择排序
 * 对当前数组进行排序
 * 双循环
 * 外层循环交换当前值和最小值
 * 内层循环查找数组剩余部分最小值
 * 选择就是指每次都从数组剩余部分选择最小的值
 * @param {array} 待排序数组
 */
selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minId = i
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minId]) {
                minId = j
            }
        }
        [array[i], array[minId]] = [array[minId], array[i]]
    }
}
let array = [2, 1, 9, 4, 5, 8, 0]
selectionSort(array)
console.log(array)