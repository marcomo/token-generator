import { BaseColorsOptions } from 'src/types'
import Color from 'tinycolor2'
import { getAdjustment } from './helpers'

export const baseColorsDefaults: BaseColorsOptions = {
  baseColor: '#818181',
  baseColorIndex: 3,
  startLevel: 100,
  lightdark: 0,
  saturate: 0,
  desaturate: 0,
  levelsCount: 7,
  tokens: {},
}
