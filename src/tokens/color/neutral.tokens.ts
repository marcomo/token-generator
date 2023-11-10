import { createColorProgressionTokens } from './helpers'

export const color = {
  neutral: createColorProgressionTokens({
    baseColor: '#4b5055',
    baseColorIndex: 6,
    baseColorKey: 'dark',
    levelsCount: 7,
    lightdark: [64, 56, 48, 24, 16, 8, 0],
    tokens: {
      light: {
        value: '#ffffff',
      },
    },
  }),
}
