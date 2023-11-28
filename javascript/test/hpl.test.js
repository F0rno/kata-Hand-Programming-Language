const { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress } = require('../src/hpl')
const { describe, it, expect, beforeAll } = require('@jest/globals')

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
      let memory
      beforeAll(() => {
        memory = new Map()
        memory.set(0, 0)
      })
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
        let position = 0
        position = decreaseMemoryPointer(position, 1, memory)
        expect(position).toBe(0)
      })
    })
  })
  describe('Read memory addresses', function () {
    let memory
    beforeAll(() => {
      memory = new Map()
      memory.set(0, 1)
      memory.set(1, 2)
      memory.set(2, 3)
    })
    it('should read 1 when we read the 0 address', function () {
      const result = readMemoryAddress()
      expect(result).toBe(1)
    })
    it('should read 2 when we read the memory value next to the 0 address, address 1', function () {
      const address = increaseMemoryPointer()
      const result = readMemoryAddress(address)
      expect(result).toBe(2)
    })
    it('should read 3 when we read the memory value behind to the 0 address, the highest known position', function () {
      const address = decreaseMemoryPointer(0, 1, memory)
      const result = readMemoryAddress(address)
      expect(result).toBe(3)
    })
  })
})
