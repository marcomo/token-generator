import { BaseColorsOptions, GetColorsOptions, Mdfy } from 'src/types'
import { baseColorsDefaults } from './base'

export const getAdjustment = (
  adjustment: BaseColorsOptions['adjustment'],
  index: number
) => {
  return Array.isArray(adjustment) ? adjustment[index] || 0 : adjustment
}

export const merge = (a: Mdfy.TokenDictionary, b: Mdfy.TokenDictionary) => ({
  ...a,
  ...b,
})

export const generateLevels = (intervals: number, startLevel: number) => {
  return Array.from(Array(intervals)).map(
    (_, index) => startLevel * (index + 1)
  )
}

export const splitLevels = (levels: number[], baseLevel) => {
  return [
    [...levels].splice(0, levels.indexOf(baseLevel)),
    [...levels].splice(levels.indexOf(baseLevel) + 1),
  ]
}

const getLightNeutrals: (options: GetColorsOptions) => Mdfy.TokenDictionary = (
  options
) => {
  const { baseColor, adjustment, levels, allLevels, lightener } = options
  return levels
    .map((v, i) => {
      return {
        [`${v}`]: {
          value: lightener(
            baseColor,
            getAdjustment(adjustment, allLevels.indexOf(v)),
            levels,
            i
          ),
        },
      }
    })
    .reduce(merge, {})
}

const getDarkNeutrals: (options: GetColorsOptions) => Mdfy.TokenDictionary = (
  options
) => {
  const { baseColor, adjustment, levels, allLevels, darkener } = options
  return levels
    .map((v, i) => {
      return {
        [`${v}`]: {
          value: darkener(
            baseColor,
            getAdjustment(adjustment, allLevels.indexOf(v)),
            levels,
            i
          ),
        },
      }
    })
    .reduce(merge, {})
}

export const createColorProgressionTokens: (
  options: BaseColorsOptions
) => Mdfy.TokenDictionary = (options) => {
  const {
    baseColor,
    startLevel,
    baseColorLevel,
    baseColorKey,
    intervals,
    tokens,
  } = Object.assign({}, baseColorsDefaults, options)
  // Generate numeric scale (eg. 100, 200, 300, ...)
  const levels = generateLevels(intervals, startLevel)
  // determine lighter and darker colors from base color
  const [lightLevels, darkLevels] = splitLevels(levels, baseColorLevel)
  return {
    // generate lighter and darker tokens
    ...getLightNeutrals({
      ...options,
      levels: lightLevels,
      allLevels: levels,
    }),
    ...getDarkNeutrals({ ...options, levels: darkLevels, allLevels: levels }),
    // add base token
    [baseColorKey || baseColorLevel]: {
      value: baseColor,
    },
    // insert additional explicit tokens
    ...tokens,
  }
}
