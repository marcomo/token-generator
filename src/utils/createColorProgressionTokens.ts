import {
  BaseColorsOptions,
  ColorAdjustment,
  GetColorsOptions,
} from '../types/Color'
import { TokenDictionary } from '../types/TokenGenerator'
import Color from 'tinycolor2'

const baseColorsDefaults: Required<BaseColorsOptions> = {
  baseColor: '#818181',
  baseColorIndex: 3,
  baseColorKey: '100',
  startLevel: 100,
  lightdark: 0,
  saturate: 0,
  spin: 0,
  desaturate: 0,
  greyscale: false,
  levelsCount: 7,
  levelGap: 100,
  tokens: {},
}

export const getAdjustment = (
  adjustment: ColorAdjustment,
  levels: number[],
  index: number,
  options: BaseColorsOptions
) => {
  return typeof adjustment == 'function'
    ? adjustment(levels, index, options)
    : Array.isArray(adjustment)
    ? adjustment[index]
    : adjustment * Math.abs(index - options.baseColorIndex) || 0
}

export const merge = (a: TokenDictionary, b: TokenDictionary) => ({
  ...a,
  ...b,
})

export const generateLevels = (
  levelsCount: number,
  startLevel: number,
  levelGap: number = 100
) => {
  return [
    startLevel,
    ...Array.from(Array(levelsCount))
      .map((_, index) => levelGap * index + startLevel)
      .slice(1),
  ]
}

export const splitLevels = (levels: number[], baseLevel) => {
  return [
    [...levels].splice(0, levels.indexOf(baseLevel)),
    [...levels].splice(levels.indexOf(baseLevel) + 1),
  ]
}

const generateColors: (options: GetColorsOptions) => TokenDictionary = (
  options
) => {
  const {
    baseColor,
    baseColorIndex,
    baseColorKey,
    lightdark,
    saturate,
    greyscale,
    spin,
    desaturate,
    levels,
  } = options

  return levels
    .map((level, i) => {
      const isBaseColor = i === baseColorIndex
      const color = Color(baseColor)

      // Use the basColorKey insteado of the level if
      const key = isBaseColor ? baseColorKey || level : level

      // The base color receives no color transformations
      if (isBaseColor) {
        return {
          [key]: {
            value: color?.toString(),
          },
        }
      } else {
        // All other colors receive transformations
        const args: [number[], number, BaseColorsOptions] = [levels, i, options]

        /**
         * Lighten and darken transformations are mutually exclusive.
         * Otherwise they would cancel each other out.
         * Lightening is only applied when index is less than the baseColorIndex.
         * Darkening is only applied when index is greater than the baseColorIndex.
         * The base color never gets transformed
         * */
        const lightness =
          lightdark && i < baseColorIndex
            ? getAdjustment(lightdark, ...args)
            : 0
        const darkness =
          lightdark && i > baseColorIndex
            ? getAdjustment(lightdark, ...args)
            : 0

        // All other transformations are applied to all colors (less the base color)
        const saturation = saturate ? getAdjustment(saturate, ...args) : null
        const desaturation = desaturate
          ? getAdjustment(desaturate, ...args)
          : null
        // Spin adjusts hue
        const hueSpin = spin ? getAdjustment(spin, ...args) : null

        return {
          [key]: {
            value: color
              ? color
                  .lighten(lightness)
                  .darken(darkness)
                  .spin(hueSpin)
                  .saturate(saturation)
                  .desaturate(greyscale ? 100 : desaturation)
                  .toString()
              : null,
          },
        }
      }
    })
    .reduce(merge, {})
}

export const createColorProgressionTokens: (
  options: BaseColorsOptions
) => TokenDictionary = (options) => {
  const { startLevel, levelsCount, levelGap, tokens } = Object.assign(
    {},
    baseColorsDefaults,
    options
  )
  // Generate numeric scale (eg. 100, 200, 300, ...)
  const levels = generateLevels(levelsCount, startLevel, levelGap)
  return {
    // generate progression tokens
    ...generateColors({
      ...options,
      levels,
    }),
    // insert additional explicit tokens
    ...tokens,
  }
}
