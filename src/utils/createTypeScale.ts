import { TypeScaleOptions } from '../types'

const defaults: TypeScaleOptions = {
  base: 16,
  factor: 1.25,
  minSize: 10,
  maxSize: 64,
  roundBeforeBy: 4,
  roundAfterBy: 4,
}

const createTypeScale: (options: TypeScaleOptions) => number[] = (options) => {
  const { base, factor, minSize, maxSize, roundBeforeBy, roundAfterBy } =
    Object.assign({}, defaults, options)
  let sizesBeforeBase: number[] = []
  let sizesAfterBase: number[] = []

  function getFirst() {
    return sizesBeforeBase[0]
  }

  function getLast() {
    return sizesAfterBase[sizesAfterBase.length - 1]
  }

  while (getFirst() === undefined || (minSize && getFirst() >= minSize)) {
    sizesBeforeBase.unshift(Number(((getFirst() || base) / factor).toFixed(2)))
  }

  // Round the before numbers by the before digit
  if (roundBeforeBy) {
    sizesBeforeBase = sizesBeforeBase.map(
      (n) => Math.round(n / roundBeforeBy) * roundBeforeBy
    )
  }

  while (getLast() === undefined || (maxSize && getLast() <= maxSize)) {
    sizesAfterBase.push(Number(((getLast() || base) * factor).toFixed(2)))
  }

  // Round the after numbers by the after digit
  if (roundAfterBy) {
    sizesAfterBase = sizesAfterBase.map(
      (n) => Math.round(n / roundAfterBy) * roundAfterBy
    )
  }

  /**
   * Spread all numbers into a single array
   * Filter numbers outside the min and max sizes
   * Filter only unique numbers
   */
  return [...sizesBeforeBase, base, ...sizesAfterBase].filter(
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
