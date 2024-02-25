import { FunctionComponent, useEffect } from 'react'
import RadioGroup from '../RadioGroup.js'
import { UseRadioProps } from '@chakra-ui/react'
import { useFonts } from 'src/context/FontsContext.js'
import { Option } from 'src/types/Option'

const FontWeightRadioGroup: FunctionComponent = () => {
  const { selectedFont, fontWeight, setFontWeight } = useFonts()

  useEffect(() => {
    if (fontWeight % 100 !== 0) {
      setFontWeight(Math.round(fontWeight / 100) * 100)
    }
  }, [])

  const handleRadioChange: UseRadioProps['onChange'] = (selected) => {
    setFontWeight(parseInt(selected.target.value))
  }

  const options: Option[] = selectedFont
    ? Array.from(
        Array((selectedFont.maxWeight - selectedFont.minWeight) / 100 + 1)
      )
        .map((_, i) => {
          return i * 100 + selectedFont.minWeight
        })
        .map((weight) => {
          return {
            value: `${weight}`,
            label: `${weight}`,
            selected: fontWeight === weight,
          }
        })
    : []
  return <RadioGroup options={options} handleChange={handleRadioChange} />
}

export default FontWeightRadioGroup
