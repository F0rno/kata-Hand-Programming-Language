const { increaseMemoryPointer, decreaseMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programming Language', function () {
  describe('Move memory pointer', function () {
    describe('Increase', function () {
      it.each`
        position | steps | expected
        ${0}     | ${1}  | ${1}
        ${0}     | ${2}  | ${2}
        ${255}   | ${1}  | ${256}
        ${256}   | ${1}  | ${257}
        `('should pass from position $position to $expected', ({ position, steps, expected }) => {
        const result = increaseMemoryPointer(position, steps)
        expect(result).toBe(expected)
      })
    })
    describe('Decrease', function () {
      it.each`
        position | steps | expected
        ${3}     | ${1}  | ${2}
        ${2}     | ${1}  | ${1}
        ${1}     | ${1}  | ${0}
        `('should pass from position $position to $expected', ({ position, steps, expected }) => {
        const result = decreaseMemoryPointer(position, steps)
        expect(result).toBe(expected)
      })
      it('should pass from position 0 to the highest known position', function () {
        const memory = new Map()
        let position = 1
        position = decreaseMemoryPointer(position, 1, memory)
        expect(position).toBe(0)
      })
    })
  })
})
