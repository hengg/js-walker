const accum = require('../exercises.js')
test('return regular string', () => {
    expect(accum('abcd')).toBe('A-Bb-Ccc-Dddd')
})

test('return regular string', () => {
    expect(accum('RqaEzty')).toBe('R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy')
})

test('return regular string', () => {
    expect(accum('cwAt')).toBe('C-Ww-Aaa-Tttt')
})

const highAndLow = require('./exercises.js')
test('return regular string', () => {
    expect(highAndLow("1 2 3 4 5")).toBe('5 1')
})

test('return regular string', () => {
    expect(highAndLow("1 2 -3 4 5")).toBe('5 -3')
})

test('return regular string', () => {
    expect(highAndLow("1 9 3 4 -5")).toBe('9 -5')
})

const XO = require('./exercises.js')
test('return regular boolean', () => {
    expect(XO("ooXx")).toBe(true)
})

test('return regular boolean', () => {
    expect(XO("zzoo")).toBe(false)
})

test('return regular boolean', () => {
    expect(XO("zpzpzpp")).toBe(false)
})

const isSquare = require('./exercises.js')
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

const maskify = require('./exercises.js')
test('return regular string', () => {
    expect(maskify('4556364607935616')).toBe('############5616')
})

test('return regular string', () => {
    expect(maskify('1')).toBe('1')
})

test('return regular string', () => {
    expect(maskify('')).toBe('')
})