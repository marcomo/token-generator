import { TypeScaleOptions } from '../../types'
import createTypeScale from '../../utils/createTypeScale'

const config: TypeScaleOptions = {
  base: 16,
  factor: 1.125,
  minSize: 12,
  maxSize: 96,
  roundBeforeBy: 4,
  roundAfterBy: 4,
}

const typeScale = createTypeScale(config)

console.log(typeScale)
export const font = {
  size: {
    ...typeScale.reduce((tokens, size) => {
      return {
        ...tokens,
        [size]: {
          value: `${size / config.base}rem`,
        },
      }
    }, {}),
    base: {
      value: '{font.size.16}',
    },
  },
}
