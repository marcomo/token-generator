import { DesignToken } from 'style-dictionary'

export type ColorModAttributes = {
  adjustment?: number
  saturation?: number
}

export type ColorModification = {
  lighten?: ColorModAttributes
  darken?: ColorModAttributes
}
/**
 * number   - adjustment = Math.abs(number * (baseIndex - index))
 * number[] - adjustment = array[number]
 * function - adjustment = return value of function(levels, index, options)
 */
export type ColorAdjustment =
  | number
  | number[]
  | ((levels: number[], index: number, options: BaseColorsOptions) => number)

export type BaseColorsOptions = {
  baseColor: string
  baseColorIndex: number
  baseColorKey?: string
  startLevel?: number
  levelGap?: number
  /**
   * adjustment can be a number for even adjustments
   * or an array of numbers for customized adjustments per color level
   */
  lightdark?: ColorAdjustment
  saturate?: ColorAdjustment
  desaturate?: ColorAdjustment
  spin?: ColorAdjustment
  greyscale?: boolean
  levelsCount: number
  tokens?: Mdfy.TokenDictionary
}

export type GetColorsOptions = Omit<BaseColorsOptions, 'intervals'> & {
  levels: number[]
}

export declare namespace Mdfy {
  interface Token extends DesignToken {
    attributes?: DesignToken['attributes']
  }
  interface TokenDictionary<T = Token> {
    [key: string]: T
  }
}
