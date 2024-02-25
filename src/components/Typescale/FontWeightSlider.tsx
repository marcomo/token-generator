import { FunctionComponent } from 'react'
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderMarkProps,
  SliderThumb,
  SliderTrack,
  Tooltip,
  UseSliderProps,
} from '@chakra-ui/react'
import { useFonts } from 'src/context/FontsContext.js'

const FontWeightSlider: FunctionComponent = () => {
  const { selectedFont, setFontWeight, fontWeight } = useFonts()
  const labelStyles: Omit<SliderMarkProps, 'value'> = {
    w: '1px',
    mt: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontSize: 'sm',
  }
  const handleSliderChange: UseSliderProps['onChange'] = (value) => {
    setFontWeight(value)
  }
  return selectedFont ? (
    <Slider
      aria-label='Font weight slider'
      name='font-weight'
      min={selectedFont.minWeight}
      max={selectedFont.maxWeight}
      defaultValue={fontWeight}
      step={1}
      my={4}
      onChange={handleSliderChange}
    >
      <SliderMark value={selectedFont.minWeight} {...labelStyles}>
        {selectedFont.minWeight}
      </SliderMark>
      <SliderMark value={selectedFont.maxWeight} {...labelStyles}>
        {selectedFont.maxWeight}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='teal.500'
        color='white'
        placement='top'
        isOpen={true}
        label={fontWeight}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  ) : null
}

export default FontWeightSlider
