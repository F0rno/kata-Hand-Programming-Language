const increaseMemoryPointer = (memoryPosition = 0, steps = 1) => {
  return memoryPosition + steps
}

const decreaseMemoryPointer = () => {
  return 2
}

module.exports = { increaseMemoryPointer, decreaseMemoryPointer }
