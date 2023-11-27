const { increaseMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programming Language', function () {
  describe('Move memory pointer', function () {
    it('should pass from position 0 to 1', function () {
      let position = 0
      position = increaseMemoryPointer()
      expect(position).toBe(1)
    })
    it('should pass from position 1 to 2', function () {
      let position = 0
      const steps = 2
      position = increaseMemoryPointer(position, steps)
      expect(position).toBe(2)
    })
    it('should pass from position 255 to 256', function () {
      let position = 255
      const steps = 1
      position = increaseMemoryPointer(position, steps)
      expect(position).toBe(256)
    })
  })
})
