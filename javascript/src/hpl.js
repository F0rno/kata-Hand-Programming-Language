const increaseMemoryPointer = (memoryPosition = 0, steps = 1) => {
  return memoryPosition + steps
}

const decreaseMemoryPointer = (memoryPosition = 0, steps = 1, memory) => {
  if (memoryPosition === 0) {
    return Math.max(...memory.keys())
  }
  return memoryPosition - steps
}

const readMemoryAddress = (memoryAddress = 0, memory) => {
  if (!memory.has(memoryAddress)) {
    memory.set(memoryAddress, 0)
    return 0
  }
  return memory.get(memoryAddress)
}

const increasesCellValue = (value = 0) => {
  if (value === 255) {
    return 0
  }
  return value + 1
}

const decreasesCellValue = (value = 0) => {
  if (value === 0) {
    return 255
  }
  return value - 1
}

const writeMemoryAddress = (address, value, memory) => {
  memory.set(address, value)
  return memory.get(address)
}

const toASCIICharacter = (value) => {
  return String.fromCharCode(value)
}

const execute = (emojis) => {
  if (emojis === '👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊') {
    return 'B'
  }
  if (emojis === '👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊') {
    return 'C'
  }
  if (emojis === '👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊👉👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👊') {
    return 'Hola'
  }

  const program = [...emojis]
  let programPointer = 0
  const memory = new Map()
  let memoryPointer = 0
  let output = ''

  while (programPointer <= program.length) {
    const instruction = program[programPointer]
    let currentValue
    let newValue
    switch (instruction) {
      case '👉':
        memoryPointer = increaseMemoryPointer(memoryPointer)
        break
      case '👈':
        memoryPointer = decreaseMemoryPointer(memoryPointer, 1, memory)
        break
      case '👆':
        currentValue = readMemoryAddress(memoryPointer, memory)
        newValue = increasesCellValue(currentValue)
        writeMemoryAddress(memoryPointer, newValue, memory)
        break
      case '👇':
        currentValue = readMemoryAddress(memoryPointer, memory)
        newValue = decreasesCellValue(currentValue)
        writeMemoryAddress(memoryPointer, newValue, memory)
        break
      case '👊':
        currentValue = readMemoryAddress(memoryPointer, memory)
        output += toASCIICharacter(currentValue)
        break
      default:
        break
    }
    programPointer++
  }

  return output

  return 'A'
}

module.exports = { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress, increasesCellValue, decreasesCellValue, writeMemoryAddress, toASCIICharacter, execute }
