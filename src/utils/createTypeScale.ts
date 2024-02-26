import { TypeScaleOptions } from '../types/Typescale'

const defaults: TypeScaleOptions = {
  baseSize: 16,
  factor: 1.25,
  minSize: 10,
  maxSize: 64,
  roundBeforeInterval: 4,
  roundAfterInterval: 4,
}

const createTypeScale: (options: TypeScaleOptions) => number[] = (options) => {
  const {
    baseSize,
    factor,
    minSize,
    maxSize,
    roundBeforeInterval,
    roundAfterInterval,
  } = Object.assign({}, defaults, options)
  let sizesBeforeBase: number[] = []
  let sizesAfterBase: number[] = []

  function getFirst() {
    return sizesBeforeBase[0]
  }

  function getLast() {
    return sizesAfterBase[sizesAfterBase.length - 1]
  }

  // factor should always be greater than 1.
  // This will run while we don't have any sizes or
  // until we reach the minSize
  while (
    (factor > 1 && getFirst() === undefined) ||
    (minSize && getFirst() >= minSize)
  ) {
    const first = getFirst()
    const next = Number(((first || baseSize) / factor).toFixed(2))
    // skip repeats, shouldn't happen
    if (next === first) {
      break
    }
    sizesBeforeBase.unshift(next)
  }

  // Round the before numbers by the before digit
  if (roundBeforeInterval) {
    sizesBeforeBase = sizesBeforeBase.map(
      (n) => Math.round(n / roundBeforeInterval) * roundBeforeInterval
    )
  }
  // factor should always be greater than 1.
  // This will run while we don't have any sizes or
  // until we reach the maxSize
  while (
    (factor > 1 && getLast() === undefined) ||
    (maxSize && getLast() <= maxSize)
  ) {
    const last = getLast()
    const next = Number(((last || baseSize) * factor).toFixed(2))
    // skip repeats, shouldn't happen
    if (next === last) {
      break
    }
    sizesAfterBase.push(next)
  }

  // Round the after numbers by the after digit
  if (roundAfterInterval) {
    sizesAfterBase = sizesAfterBase.map(
      (n) => Math.round(n / roundAfterInterval) * roundAfterInterval
    )
  }

  /**
   * Spread all numbers into a single array
   * Filter numbers outside the min and max sizes
   * Filter only unique numbers
   */
  return [...sizesBeforeBase, baseSize, ...sizesAfterBase].filter(
    (num, index, array) => {
      return (
        minSize &&
        maxSize &&
        num >= minSize &&
        num <= maxSize &&
        array.indexOf(num) === index
      )
    }
  )
}
export default createTypeScale
