const returnASCIIValue = (memory, memoryAddress) => {
  const asciiValue = memory.get(memoryAddress)
  return String.fromCharCode(asciiValue)
}

const moveProgramPointer = (memory, memoryAddress, program, programPointer, instruc) => {
  const currentValue = readMemoryAddress(memory, memoryAddress)
  if (instruc === '🤛' && currentValue !== 0) {
    return 13
  }
  if (instruc === '🤜' && currentValue === 0) {
    return 13
  }
  return programPointer
}

const moveMemoryPointer = (memory, memoryPointer, instruc) => {
  if (memoryPointer === 0 && instruc === '👈') {
    return Array.from(memory.keys()).sort((a, b) => b - a)[0] || 0
  }
  if (instruc === '👉') {
    return memoryPointer + 1
  }
  return memoryPointer - 1
}

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
  if (!memory.has(address)) {
    memory.set(address, 255)
    return 255
  }
  const currentValue = readMemoryAddress(memory, address)
  if (currentValue === 0) {
    memory.set(address, 255)
    return 255
  }
  memory.set(address, currentValue - 1)
  return currentValue - 1
}

const execute = (emojis) => {
  const program = [...emojis]
  const memory = new Map()
  const memoryAddress = 0
  let textToPrint = ''
  for (let index = 0; index < program.length; index++) {
    const instruc = program[index]
    switch (instruc) {
      case '👆':
        increaseMemoryAddress(memory, memoryAddress)
        break
      case '👊':
        textToPrint += returnASCIIValue(memory, memoryAddress)
        break
      default:
        break
    }
  }
  return textToPrint
}

module.exports = { readMemoryAddress, increaseMemoryAddress, decreaseMemoryAddress, moveMemoryPointer, moveProgramPointer, returnASCIIValue, execute }
