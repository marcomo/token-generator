import { BaseColorsOptions } from 'src/types'
import Color from 'tinycolor2'
import { getAdjustment } from './helpers'

export const baseColorsDefaults: BaseColorsOptions = {
  baseColor: '#818181',
  baseColorLevel: 400,
  adjustment: 8,
  intervals: 7,
  startLevel: 100,
  tokens: {},
  lightener: (color, adjustment, _levels, index) => {
    const value = getAdjustment(adjustment, index)
    return Color(color).lighten(value * (index + 1))
  },
  darkener: (color, adjustment, levels, index) => {
    const value = getAdjustment(adjustment, index)
    return Color(color).darken(value * (levels.length - index))
  },
}
