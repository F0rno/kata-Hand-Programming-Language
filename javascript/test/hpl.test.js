const { readMemoryAddresse } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programming Language', function () {
  describe('Read memory addresses', function () {
    it('should read 0 when we read the initial addresse', function () {
      const memoryAddresse = 0
      const result = readMemoryAddresse()
      expect(result).toBe(0)
    })
    it('should read 0 when we read the next memory addresse', function () {
      const memoryAddresse = 1
      const result = readMemoryAddresse(memoryAddresse)
      expect(result).toBe(0)
    })
  })
})
