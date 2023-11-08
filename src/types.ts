import { DesignToken } from 'style-dictionary'

export type TypeScaleOptions = {
  base: number
  factor: number
  minSize?: number
  maxSize?: number
  roundBeforeBy?: number
  roundAfterBy?: number
}

type ColorScaler = (
  color: BaseColorsOptions['baseColor'],
  adjustment: number,
  levels: number[],
  index: number
) => string

export type BaseColorsOptions = {
  baseColor: string
  baseColorLevel: number
  baseColorKey?: string
  /**
   * adjustment can be a number for even adjustments
   * or an array of numbers for customized adjustments per color level
   */
  adjustment: number | number[]
  intervals: number
  lightener?: ColorScaler
  darkener?: ColorScaler
  tokens?: Mdfy.TokenDictionary
}

export type BaseColorsConfig = {
  startLevel: 100
}

export type GetColorsOptions = Omit<BaseColorsOptions, 'intervals'> & {
  levels: number[]
  allLevels: number[]
}

export declare namespace Mdfy {
  interface Token extends DesignToken {
    attributes?: DesignToken['attributes']
  }
  interface TokenDictionary<T = Token> {
    [key: string]: T
  }
}
