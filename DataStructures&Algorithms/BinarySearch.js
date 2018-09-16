/**
 * 二分查找
 * 二分查找只适用于有序数组.
 * 定义索引值[low,high]=[0,array.length]
 * 执行循环不变式执行比较待查值在数组的位置,找到后返回索引值
 * 未找到则返回 -1
 * @param {array} 有序数组
 * @param {number} 待查数据
 * @returns {number} 待查数据在数组中的索引值
 */
binarySearch = (array, item) => {
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    let mid = parseInt((low + high) / 2)// JS除法不取整
    if (item === array[mid]) {
      return mid
    }
    if (item < array[mid]) {
      high = mid - 1
    }
    else {
      low = mid + 1
    }
  }
  return -1
}

const array = [1, 2, 3, 5, 6, 9, 14, 18]
console.log(binarySearch(array, 9))