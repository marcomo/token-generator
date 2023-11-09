import Color from 'tinycolor2'
import { createColorProgressionTokens } from './helpers'

export const color = {
  neutral: createColorProgressionTokens({
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
}
