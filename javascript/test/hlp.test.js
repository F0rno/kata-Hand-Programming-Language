const { renameMe } = require('../src/hpl')
const { describe, it, expect } = require('@jest/globals')

describe('Hand Programing Language', function () {
  it('change_this_name', function () {
    const result = renameMe()
    expect(result).toBe(true)
  })
})
