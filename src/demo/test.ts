import { TypeScaleOptions } from 'src/types/Typescale.js'
import createTypescale from '../utils/createTypeScale.js'
import mdfyStyleDictionary from '../sdconfig'

export const typescaleDemo1 = () => {
  const options1: TypeScaleOptions = {
    baseSize: 24,
    maxSize: 72,
    minSize: 16,
    factor: 1.125,
    roundBeforeInterval: 4,
    roundAfterInterval: 8,
  }
  console.log('Test 1:')
  console.log('TypeScale Options:', options1)
  console.log('TypeScale Output:', createTypescale(options1))
}

export const typescaleDemo2 = () => {
  const options2: TypeScaleOptions = {
    baseSize: 16,
    factor: 1.125,
    minSize: 12,
    maxSize: 96,
    roundBeforeInterval: 4,
    roundAfterInterval: 4,
  }
  console.log('\nTest 2:')
  console.log('TypeScale Options:', options2)
  console.log('TypeScale Output:', createTypescale(options2))
}

typescaleDemo1()
typescaleDemo2()
mdfyStyleDictionary.buildAllPlatforms()
