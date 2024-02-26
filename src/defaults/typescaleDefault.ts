import { TypeScaleOptions } from '../types/Typescale'
import createTypeScale from '../utils/createTypeScale'

export const typescaleDefaultConfig: TypeScaleOptions = {
  baseSize: 16,
  factor: 1.125,
  minSize: 12,
  maxSize: 96,
  roundBeforeInterval: 4,
  roundAfterInterval: 4,
}

export const typescaleDefault = createTypeScale(typescaleDefaultConfig)
