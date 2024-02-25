import { createColorProgressionTokens } from '../../utils/createColorProgressionTokens'

export const color = {
  huedNeutrals: createColorProgressionTokens({
    baseColor: '#212A39',
    baseColorIndex: 5,
    levelsCount: 7,
    lightdark: [74, 59.2, 44.4, 29.6, 14.8, 0, 8],
    desaturate: (levels, index) => index * (15 / levels.length),
    spin: (levels, index) => (levels.length - index) * -2,
  }),
}
