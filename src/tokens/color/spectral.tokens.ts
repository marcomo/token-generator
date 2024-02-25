import { createColorProgressionTokens } from '../../utils/createColorProgressionTokens'
import { TokenDictionary } from 'src/types/TokenGenerator'

export const color: TokenDictionary<TokenDictionary<TokenDictionary>> = {
  spectral: {
    red: createColorProgressionTokens({
      baseColor: '#C63454',
      levelsCount: 3,
      baseColorIndex: 1,
      lightdark: [8, 0, 10],
      saturate: 12,
    }),
    orange: createColorProgressionTokens({
      baseColor: '#F2660D',
      levelsCount: 3,
      baseColorIndex: 1,
      lightdark: 8,
      saturate: 12,
    }),
    yellow: createColorProgressionTokens({
      baseColor: '#FCC900',
      levelsCount: 3,
      baseColorIndex: 1,
      lightdark: [16, 0, 4],
      saturate: [12, 0, 16],
    }),
    green: createColorProgressionTokens({
      baseColor: '#6CD086',
      levelsCount: 3,
      baseColorIndex: 1,
      lightdark: [8, 0, 12],
      saturate: [12, 0, 4],
    }),
    cyan: createColorProgressionTokens({
      baseColor: '#30CED8',
      levelsCount: 3,
      baseColorIndex: 1,
      lightdark: [8, 0, 10],
      saturate: 12,
    }),
    blue: {
      '100': {
        value: '{color.progression.200}',
      },
      '200': {
        value: '{color.progression.300}',
      },
      '300': {
        value: '{color.progression.400}',
      },
    },
    // createColorProgressionTokens({
    //   baseColor: '#1157F7',
    //   levelsCount: 3,
    //   baseColorIndex: 2,
    //   lightdark: 8,
    //   saturate: 12,
    // }),
    violet: createColorProgressionTokens({
      baseColor: '#9055F7',
      levelsCount: 3,
      baseColorIndex: 1,
      lightdark: [8, 0, 6],
      saturate: [12, 0, 8],
    }),
  },
}
