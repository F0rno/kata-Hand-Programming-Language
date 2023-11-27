const { increaseMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programming Language', function () {
  describe('Move memory pointer', function () {
    it('should pass from position 0 to 1', function () {
      const result = increaseMemoryPointer()
      expect(result).toBe(1)
    })
  })
})
