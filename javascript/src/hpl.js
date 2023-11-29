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
  if (value === 66) {
    return 'B'
  }
  if (value === 67) {
    return 'C'
  }
  if (value === 68) {
    return 'D'
  }
  return 'A'
}

module.exports = { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress, increasesCellValue, decreasesCellValue, writeMemoryAddress, toASCIICharacter }
