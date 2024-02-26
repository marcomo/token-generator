import mdfyStyleDictionary from '../sdconfig'
import {
  typescaleDefault,
  typescaleDefaultConfig,
} from '../defaults/typescaleDefault'

export const logTypescale = () => {
  console.log('Typescale ----------')
  console.log('options:', typescaleDefaultConfig)
  console.log('output:', typescaleDefault)
}

logTypescale()
mdfyStyleDictionary.buildAllPlatforms()
