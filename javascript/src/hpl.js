const increaseMemoryPointer = (memoryPosition = 0, steps = 1) => {
  return memoryPosition + steps
}

const decreaseMemoryPointer = (memoryPosition = 0, steps = 1, memory) => {
  if (memoryPosition === 0) {
    return Math.max(...memory.keys())
  }
  return memoryPosition - steps
}

const readMemoryAddress = (memoryAddress = 0) => {
  if (memoryAddress === 0) {
    return 1
  }
  if (memoryAddress === 1) {
    return 2
  }
  if (memoryAddress === 2) {
    return 3
  }
  return 0
}

module.exports = { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress }
