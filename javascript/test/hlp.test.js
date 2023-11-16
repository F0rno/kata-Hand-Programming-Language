const { readMemoryAddress, increaseMemoryAddress, decreaseMemoryAddress } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programing Language', function () {
  it('should return 0 when I read a new memory address', function () {
    const memory = new Map()
    const result = readMemoryAddress(memory, 0)
    expect(result).toBe(0)
  })
  it('should return the current value of the memory address plus 1 when we increase the value of the memory cell if is not 255', function () {
    const memory = new Map()
    const result = increaseMemoryAddress(memory, 0)
    expect(result).toBe(1)
  })
  it('should return 0 if we increase a memory cell with a value of 255', function () {
    const memory = new Map()
    memory.set(0, 255)
    const result = increaseMemoryAddress(memory, 0)
    expect(result).toBe(0)
  })
  it('should return the current value of the memory address minus 1 when we decrease the value of the memory cell if is not 0', function () {
    const memory = new Map()
    increaseMemoryAddress(memory, 0)
    const result = decreaseMemoryAddress(memory, 0)
    expect(result).toBe(0)
  })
})
