import Color from 'tinycolor2'
import { createColorProgressionTokens } from './helpers'

export const color = {
  huedNeutrals: createColorProgressionTokens({
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
