const readMemoryAddress = (memory, address) => {
  if (!memory.has(address)) {
    memory.set(address, 0)
    return 0
  }
  return memory.get(address)
}

const increaseMemoryAddress = (memory, address) => {
  if (!memory.has(address)) {
    memory.set(address, 1)
    return 1
  }
  const currentValue = readMemoryAddress(memory, address)
  if (currentValue === 255) {
    memory.set(address, 0)
    return 0
  }
  memory.set(address, currentValue + 1)
  return currentValue + 1
}

const decreaseMemoryAddress = (memory, address) => {
  return 0
}

module.exports = { readMemoryAddress, increaseMemoryAddress, decreaseMemoryAddress }
