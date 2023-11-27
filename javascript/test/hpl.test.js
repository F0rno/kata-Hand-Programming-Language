const { increaseMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programming Language', function () {
  describe('Move memory pointer', function () {
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
})
