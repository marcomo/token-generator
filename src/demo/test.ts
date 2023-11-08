import { CreateTypeScaleOptions } from 'src/types'
import { createTypeScale } from '../'

const options1: CreateTypeScaleOptions = {
  base: 24,
  maxSize: 72,
  minSize: 16,
  factor: 1.125,
  roundBeforeBy: 4,
  roundAfterBy: 8,
}

const options2: CreateTypeScaleOptions = {
  base: 16,
  maxSize: 128,
  minSize: 10,
  factor: 1.25,
  roundBeforeBy: 2,
  roundAfterBy: 8,
}

console.log('Test 1:')
console.log('TypeScale Options:', options1)
console.log('TypeScale Output:', createTypeScale(options1))
console.log('\nTest 2:')
console.log('TypeScale Options:', options2)
console.log('TypeScale Output:', createTypeScale(options2))
