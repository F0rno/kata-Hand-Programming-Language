const { increaseMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programming Language', function () {
  describe('Move memory pointer', function () {
    it('should pass from position 0 to 1', function () {
      const result = increaseMemoryPointer()
      expect(result).toBe(1)
    })
    it('should pass from position 1 to 2', function () {
      const steps = 2
      const result = increaseMemoryPointer(steps)
      expect(result).toBe(2)
    })
  })
})
