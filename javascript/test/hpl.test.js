const { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress, increasesCellValue, decreasesCellValue, writeMemoryAddress, toASCIICharacter, execute, jumpIfZero, jumpIfNotZero } = require('../src/hpl')
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
    describe('Increase', function () {
      it.each`
      value   | expected
      ${0}    | ${1}
      ${1}    | ${2}
      ${2}    | ${3}
      ${255}  | ${0}
      `('should increase a cell with $value to $expected', ({ value, expected }) => {
        const result = increasesCellValue(value)
        expect(result).toBe(expected)
      })
    })
    describe('Decrement', function () {
      it.each`
      value   | expected
      ${3}    | ${2}
      ${2}    | ${1}
      ${1}    | ${0}
      ${0}    | ${255}
      `('should decrease a cell with $value to $expected', ({ value, expected }) => {
        const result = decreasesCellValue(value)
        expect(result).toBe(expected)
      })
    })
  })
  describe('Write to memory addresses', function () {
    let memory
    beforeAll(() => {
      memory = new Map()
    })
    it.each`
    address | expected
    ${0}    | ${1}
    ${1}    | ${2}
    ${2}    | ${3}
    ${3}    | ${4}
    `('should write $expected in the address $address', ({ address, expected }) => {
      writeMemoryAddress(address, expected, memory)
      const result = readMemoryAddress(address, memory)
      expect(result).toBe(expected)
    })
  })
  describe('Get ASCII characters', function () {
    it.each`
    value  | expected
    ${65}  | ${'A'}
    ${66}  | ${'B'}
    ${67}  | ${'C'}
    ${68}  | ${'D'}
    `('should return "$expected" when the value of the memory cell is $value', ({ value, expected }) => {
      const result = toASCIICharacter(value)
      expect(result).toBe(expected)
    })
  })
  describe('Executing emojis, with no conditionals', function () {
    it.each`
      expected   | emojis
      ${'A'}     | ${'👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊'}
      ${'B'}     | ${'👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊'}
      ${'C'}     | ${'👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊'}
      ${'Hola'}  | ${'👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊'}
      `('should return $expected when we execute $emojis', ({ expected, emojis }) => {
      const result = execute(emojis)
      expect(result).toBe(expected)
    })
  })
  describe('Conditionals', function () {
    describe('Jump if current memory cell value is 0 🤜 🤛', function () {
      it('should return the index of the next 🤛 when we pass 🤜👆🤛', function () {
        const program = [...'🤜👆🤛']
        const programPointer = 0
        const currentValue = 0
        const result = jumpIfZero(program, programPointer, currentValue)
        expect(result).toBe(2)
      })
      it('should return the current program pointer when we pass 👆🤜👆🤛', function () {
        const program = [...'👆🤜👆🤛']
        const programPointer = 1
        const currentValue = 1
        const result = jumpIfZero(program, programPointer, currentValue)
        expect(result).toBe(1)
      })
      it.each`
      expected   | emojis
      ${'A'}     | ${'🤜👆🤛👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊'}
      ${'B'}     | ${'👆🤜👆🤛 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊'}
      `('should return $expected when we pass $emojis', ({ expected, emojis }) => {
        const result = execute(emojis)
        expect(result).toBe(expected)
      })
    })
    describe('Jump if current memory cell value is not 0 🤛 🤜', function () {
      it('should return the index of the next 🤜 when we pass 👆🤛👆🤜', function () {
        const program = [...'👆🤛👆🤜']
        const programPointer = 1
        const currentValue = 1
        const result = jumpIfNotZero(program, programPointer, currentValue)
        expect(result).toBe(3)
      })
      it('should return the current program pointer when we pass 🤛👆🤜', function () {
        const program = [...'🤛👆🤜']
        const programPointer = 0
        const currentValue = 0
        const result = jumpIfNotZero(program, programPointer, currentValue)
        expect(result).toBe(0)
      })
      it.each`
      expected   | emojis
      ${'A'}     | ${'👆🤛👆🤜 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊'}
      ${'B'}     | ${'🤛👆🤜 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊'}
      `('should return $expected when we pass $emojis', ({ expected, emojis }) => {
        const result = execute(emojis)
        expect(result).toBe(expected)
      })
    })
  })
  describe('Nice kata', function () {
    it('now, I should go out', function () {
      const emojis = '👉👉👉🤜👆👇👆👇👆👇👆👇👆👇👆👇🤛👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉🤜👆👇👆👇👆👇👆👇👆👇👆👇👆👇🤛👈👈👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👉👉👉👉👉👉👉🤜👆👇👆👇👆👇👆👇🤛👈👈👈👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉🤜👆👇👆👇👆👇👆👇👆👇👆👇👆👇👆👇🤛👈👈👈👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👉👉👆🤛👆👇👆👇👆👇👆👇🤜👇👈👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👉👉👉👉👉👆🤛👆👇👆👇👆👇👆👇🤜👇👈👈👈👈👈👈👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊'
      const result = execute(emojis)
      expect(result).toBe('Emojis everywhere')
    })
  })
})
