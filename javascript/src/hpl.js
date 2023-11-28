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
  if (value === 1) {
    return 2
  }
  return 1
}

module.exports = { increaseMemoryPointer, decreaseMemoryPointer, readMemoryAddress, increasesCellValue }
