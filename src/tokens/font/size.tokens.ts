import { TypeScaleOptions } from '../../types/Typescale'
import createTypeScale from '../../utils/createTypeScale'

const config: TypeScaleOptions = {
  baseSize: 16,
  factor: 1.125,
  minSize: 12,
  maxSize: 96,
  roundBeforeInterval: 4,
  roundAfterInterval: 4,
}

const typeScale = createTypeScale(config)

export const font = {
  size: {
    ...typeScale.reduce((tokens, size) => {
      return {
        ...tokens,
        [size]: {
          value: `${size / config.baseSize}rem`,
        },
      }
    }, {}),
    base: {
      value: '{font.size.16}',
    },
  },
}
