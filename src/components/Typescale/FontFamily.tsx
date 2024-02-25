import { UseRadioProps } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFonts } from 'src/context/FontsContext'
import RadioGroup from '../RadioGroup'

const FontFamily: React.FunctionComponent = () => {
  const { setSelectedFont, fonts, selectedFont } = useFonts()

  useEffect(() => {
    if (fonts.length) {
      const font = fonts[0]
      setSelectedFont({
        family: font.family,
        style: font.variants[0]?.style,
        name: font.family,
        isVariable: font.isVariable,
        minWeight: font.minWeight,
        maxWeight: font.maxWeight,
      })
    }
  }, [fonts])

  const handleChange: UseRadioProps['onChange'] = (selected) => {
    const data = selected.target.dataset
    setSelectedFont({
      family: data.family,
      style: data.style,
      name: selected.target.value,
      isVariable: data.isvariable === 'true',
      minWeight: parseInt(data.minweight),
      maxWeight: parseInt(data.maxweight),
    })
  }

  return (
    <RadioGroup
      options={fonts.map((font) => {
        return {
          value: font.family,
          label: font.family,
          selected: font.family === selectedFont?.family,
          data: {
            'data-family': font.family,
            'data-minweight': `${font.minWeight}`,
            'data-maxweight': `${font.maxWeight}`,
            'data-isvariable': `${font.isVariable}`,
          },
        }
      })}
      handleChange={handleChange}
    />
  )
}

export default FontFamily
