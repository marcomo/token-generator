import { TypeScaleOptions } from '../types'
import createTypeScale from '../utils/createTypeScale'
import mdfyStyleDictionary from '../sdconfig'

const options1: TypeScaleOptions = {
  base: 24,
  maxSize: 72,
  minSize: 16,
  factor: 1.125,
  roundBeforeBy: 4,
  roundAfterBy: 8,
}

const options2: TypeScaleOptions = {
  base: 16,
  factor: 1.125,
  minSize: 12,
  maxSize: 96,
  roundBeforeBy: 4,
  roundAfterBy: 4,
}

console.log('Test 1:')
console.log('TypeScale Options:', options1)
console.log('TypeScale Output:', createTypeScale(options1))
console.log('\nTest 2:')
console.log('TypeScale Options:', options2)
console.log('TypeScale Output:', createTypeScale(options2))
mdfyStyleDictionary.buildAllPlatforms()
