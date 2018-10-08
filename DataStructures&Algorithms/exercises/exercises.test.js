const { accum } = require('./exercises.js')
test('return regular string', () => {
    expect(accum('abcd')).toBe('A-Bb-Ccc-Dddd')
})
test('return regular string', () => {
    expect(accum('RqaEzty')).toBe('R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy')
})
test('return regular string', () => {
    expect(accum('cwAt')).toBe('C-Ww-Aaa-Tttt')
})

const { highAndLow } = require('./exercises.js')
test('return regular string', () => {
    expect(highAndLow("1 2 3 4 5")).toBe('5 1')
})
test('return regular string', () => {
    expect(highAndLow("1 2 -3 4 5")).toBe('5 -3')
})
test('return regular string', () => {
    expect(highAndLow("1 9 3 4 -5")).toBe('9 -5')
})

const { XO } = require('./exercises.js')
test('return regular boolean', () => {
    expect(XO("ooXx")).toBe(true)
})
test('return regular boolean', () => {
    expect(XO("zzoo")).toBe(false)
})
test('return regular boolean', () => {
    expect(XO("zpzpzpp")).toBe(true)
})

const { isSquare } = require('./exercises.js')
test('return regular boolean', () => {
    expect(isSquare(0)).toBe(true)
})
test('return regular boolean', () => {
    expect(isSquare(1)).toBe(true)
})
test('return regular boolean', () => {
    expect(isSquare(3)).toBe(false)
})
test('return regular boolean', () => {
    expect(isSquare(-1)).toBe(false)
})

const { maskify } = require('./exercises.js')
test('return regular string', () => {
    expect(maskify('4556364607935616')).toBe('############5616')
})
test('return regular string', () => {
    expect(maskify('1111')).toBe('1111')
})
test('return regular string', () => {
    expect(maskify('')).toBe('')
})

const { sumOfRow } = require('./exercises.js')
test('return regular number', () => {
    expect(sumOfRow(2)).toBe(8)
})
test('return regular number', () => {
    expect(sumOfRow(3)).toBe(27)
})
test('return regular number', () => {
    expect(sumOfRow(42)).toBe(74088)
})

const { squareDigits } = require('./exercises.js')
test('return regular number', () => {
    expect(squareDigits(2)).toBe(4)
})
test('return regular number', () => {
    expect(squareDigits(12)).toBe(14)
})
test('return regular number', () => {
    expect(squareDigits(9119)).toBe(811181)
})

const { solution } = require('./exercises.js')
test('solution return regular number', () => {
    expect(solution(10)).toBe(23)
})
test('solution return regular number', () => {
    expect(solution(16)).toBe(60)
})
test('solution return regular number', () => {
    expect(solution(1)).toBe(0)
})
const { recursiveReverse } = require('./exercises.js')
test('recursiveReverse return array', () => {
    expect(recursiveReverse([1, 2, 3])).toEqual([3, 2, 1])
})