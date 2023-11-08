import {
  BaseColorsConfig,
  BaseColorsOptions,
  Mdfy,
  GetColorsOptions,
} from '../../types'
import Color from 'tinycolor2'

const baseColorsDefaults: BaseColorsOptions & BaseColorsConfig = {
  baseColor: '#818181',
  baseColorLevel: 400,
  adjustment: 8,
  intervals: 7,
  startLevel: 100,
  tokens: {},
  lightener: (color, adjustment, _levels, index) => {
    const lighten = Array.isArray(adjustment)
      ? adjustment[index] || 0
      : adjustment
    return Color(color)
      .lighten(lighten * (index + 1))
      .toString()
  },
  darkener: (color, adjustment, levels, index) => {
    const darken = Array.isArray(adjustment)
      ? adjustment[index] || 0
      : adjustment
    return Color(color)
      .lighten(darken * (levels.length - index))
      .toString()
  },
}

const merge = (a: Mdfy.TokenDictionary, b: Mdfy.TokenDictionary) => ({
  ...a,
  ...b,
})

const getAdjustment = (
  adjustment: BaseColorsOptions['adjustment'],
  index?: number
) => (Array.isArray(adjustment) ? adjustment[index] || 0 : adjustment)

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

const getColorTokens: (
  name: string,
  options: BaseColorsOptions & BaseColorsConfig
) => Mdfy.TokenDictionary<Mdfy.TokenDictionary> = (name, options) => {
  const {
    baseColor,
    startLevel,
    baseColorLevel,
    baseColorKey,
    intervals,
    tokens,
  } = options
  // Generate numeric scale (eg. 100, 200, 300, ...)
  const levels = Array.from(Array(intervals)).map(
    (_, index) => startLevel * (index + 1)
  )
  // determine lighter and darker colors from base color
  const lightLevels = [...levels].splice(0, levels.indexOf(baseColorLevel))
  const darkLevels = [...levels].splice(levels.indexOf(baseColorLevel) + 1)
  console.log({ lightLevels, baseColorLevel, darkLevels })
  return {
    [name]: {
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
    },
  }
}

const getBaseColors: (
  name: string,
  options: BaseColorsOptions
) => Mdfy.TokenDictionary<Mdfy.TokenDictionary> = (name, options) => {
  const mergedOptions = Object.assign({}, baseColorsDefaults, options)

  return getColorTokens(name, { ...mergedOptions })
}

export const color = {
  ...getBaseColors('neutral', {
    baseColor: '#4b5055',
    baseColorLevel: 700,
    baseColorKey: 'dark',
    intervals: 7,
    adjustment: [64, 56, 48, 24, 16, 8, 0],
    lightener: (baseColor, adjustment) => {
      return Color(baseColor).lighten(adjustment).greyscale().toString()
    },
    tokens: {
      light: {
        value: '#ffffff',
      },
    },
  }),
  ...getBaseColors('huedNeutral', {
    baseColor: '#212A39',
    baseColorLevel: 600,
    intervals: 7,
    adjustment: [74, 59.2, 44.4, 29.6, 14.8, 0, 8],
    lightener: (baseColor, adjustment, levels, index) => {
      const desaturate = index * (10 / levels.length)
      const spin = (levels.length - index) * -3
      return Color(baseColor)
        .lighten(adjustment)
        .spin(spin)
        .desaturate(desaturate)
        .toString()
    },
    darkener: (baseColor, adjustment, levels, index) => {
      return Color(baseColor).darken(adjustment).toString()
    },
  }),
}
