const increaseMemoryPointer = (memoryPosition = 0, steps = 1) => {
  return memoryPosition + steps
}

const decreaseMemoryPointer = (memoryPosition = 0) => {
  if (memoryPosition === 1) {
    return 0
  }
  if (memoryPosition === 2) {
    return 1
  }
  return 2
}

module.exports = { increaseMemoryPointer, decreaseMemoryPointer }
