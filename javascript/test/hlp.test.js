const { readMemoryAddress } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programing Language', function () {
  it('should return 0 when I read a new memory address', function () {
    const memory = new Map()
    const result = readMemoryAddress(memory, 0)
    expect(result).toBe(0)
  })
})
