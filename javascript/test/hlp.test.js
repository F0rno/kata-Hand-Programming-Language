const { readMemoryAddress, increaseMemoryAddress, decreaseMemoryAddress, moveMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programing Language', function () {
  describe('Memory read and write', function () {
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
    it('should return 255 if we decrease a memory cell with value 0', function () {
      const memory = new Map()
      const result = decreaseMemoryAddress(memory, 0)
      expect(result).toBe(255)
    })
  })
  describe('Moving the memory pointer', function () {
    it('should increase the memory pointer by 1 when we pass 👉', function () {
      const memory = new Map()
      const memoryPointer = 0
      const result = moveMemoryPointer(memory, memoryPointer, '👉')
      expect(result).toBe(1)
    })
    it('should decrease the memory pointer when we pass 👈', function () {
      const memory = new Map()
      const memoryPointer = 1
      const result = moveMemoryPointer(memory, memoryPointer, '👈')
      expect(result).toBe(0)
    })
    it('should return the the maximum known memory address when we decrease the 0 address', function () {
      const memory = new Map()
      const memoryPointer = 0
      const result = moveMemoryPointer(memory, memoryPointer, '👈')
      const largestMemoryAddress = Array.from(memory.keys()).sort((a, b) => b - a)[0] || 0
      expect(result).toBe(largestMemoryAddress)
    })
  })
})
