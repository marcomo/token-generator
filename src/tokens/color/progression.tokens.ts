import { createColorProgressionTokens } from '../../utils/createColorProgressionTokens'

export const color = {
  progression: createColorProgressionTokens({
    baseColor: '#1157f7',
    baseColorIndex: 3,
    levelsCount: 7,
    lightdark: (levels, index, { baseColorIndex: bi }) => {
      const adjustment = (0.85 / levels.length) * 100
      return index < bi ? adjustment * (bi - index) : adjustment * (index - bi)
    },
  }),
}
