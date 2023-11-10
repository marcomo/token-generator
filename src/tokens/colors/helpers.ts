import {
  BaseColorsOptions,
  ColorAdjustment,
  GetColorsOptions,
  Mdfy,
} from 'src/types'
import { baseColorsDefaults } from './base'
import Color from 'tinycolor2'

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

export const merge = (a: Mdfy.TokenDictionary, b: Mdfy.TokenDictionary) => ({
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

const generateColors: (options: GetColorsOptions) => Mdfy.TokenDictionary = (
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
            value: color.toString(),
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
          i < baseColorIndex ? getAdjustment(lightdark, ...args) : 0
        const darkness =
          i > baseColorIndex ? getAdjustment(lightdark, ...args) : 0

        // All other transformations are applied to all colors (less the base color)
        const saturation = getAdjustment(saturate, ...args)
        const desaturation = getAdjustment(desaturate, ...args)
        // Spin adjusts hue
        const hueSpin = getAdjustment(spin, ...args)

        return {
          [key]: {
            value: color
              .lighten(lightness)
              .darken(darkness)
              .spin(hueSpin)
              .saturate(saturation)
              .desaturate(greyscale ? 100 : desaturation)
              .toString(),
          },
        }
      }
    })
    .reduce(merge, {})
}

export const createColorProgressionTokens: (
  options: BaseColorsOptions
) => Mdfy.TokenDictionary = (options) => {
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
