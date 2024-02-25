import { FunctionComponent } from 'react'
import FontWeightRadioGroup from './FontWeightRadioGroup.js'
import { useFonts } from 'src/context/FontsContext.js'
import FontWeightSlider from './FontWeightSlider.js'

const FontWeight: FunctionComponent = () => {
  const { selectedFont } = useFonts()

  return selectedFont ? (
    selectedFont.isVariable ? (
      <FontWeightSlider />
    ) : (
      <FontWeightRadioGroup />
    )
  ) : null
}

export default FontWeight
