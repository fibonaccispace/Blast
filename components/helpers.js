const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
const isDefined = (index, array) => index >= 0 && index < array.length
const isDefined2D = (row, col, array) => row >= 0 && col >= 0 && row < array.length && col < array[row].length

export { random, isDefined, isDefined2D }
