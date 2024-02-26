import { typescaleDefaultConfig } from '../defaults/typescaleDefault'
import { TokenDictionary } from '../types/TokenGenerator'

export const createTypeScaleTokens: (
  typeScale: number[]
) => TokenDictionary<TokenDictionary> = (typeScale) => {
  return {
    size: {
      ...typeScale.reduce((tokens, size) => {
        return {
          ...tokens,
          [size]: {
            value: `${size / typescaleDefaultConfig.baseSize}rem`,
          },
        }
      }, {}),
      base: {
        value: '{font.size.16}',
      },
    },
  }
}
