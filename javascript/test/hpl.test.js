const { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress, increasesCellValue } = require('../src/hpl')
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
    it.each`
      address | expected
      ${0}    | ${1}
      ${1}    | ${2}
      ${2}    | ${3}
      `('should read $expected when we read the $address address', ({ address, expected }) => {
      const result = readMemoryAddress(address, memory)
      expect(result).toBe(expected)
    })
    it('should read 3 when we read the memory value behind to the 0 address, the highest known position', function () {
      const address = decreaseMemoryPointer(0, 1, memory)
      const result = readMemoryAddress(address, memory)
      expect(result).toBe(3)
    })
    it('should read 0 when we read the memory value of address 3', function () {
      const address = 3
      const result = readMemoryAddress(address, memory)
      expect(result).toBe(0)
    })
  })
  describe('Modify memory values', function () {
    describe('Increase values', function () {
      it('should increase a cell with value 0 to 1', function () {
        const result = increasesCellValue()
        expect(result).toBe(1)
      })
    })
  })
})
