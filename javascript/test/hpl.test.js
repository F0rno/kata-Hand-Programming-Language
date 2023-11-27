const { increaseMemoryPointer, decreaseMemoryPointer } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

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
    /*
        Pasa de la posición 3 de memoria, a la 2
        Pasa de la posición 2 de memoria, a la 1
        Pasa de la posición 1 de memoria, a la 0
        Pasa de la posición 0 de memoria, a la mayor posición conocida
    */
      it('should pass from position 3 to 2', function () {
        let position = 3
        position = decreaseMemoryPointer()
        expect(position).toBe(2)
      })
      it('should pass from position 2 to 1', function () {
        let position = 2
        position = decreaseMemoryPointer(position)
        expect(position).toBe(1)
      })
    })
  })
})
