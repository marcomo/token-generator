import { VStack } from '@chakra-ui/react'
import { useTypescale } from 'src/context/TypescaleContext.js'
import NumberStepper from '../NumberStepper.js'
import Heading from '../Heading.js'

const TypescaleConfig = () => {
  const {
    size,
    setSize,
    factor,
    setFactor,
    minSize,
    setMinSize,
    maxSize,
    setMaxSize,
    roundBeforeInterval,
    setRoundBeforeInterval,
    roundAfterInterval,
    setRoundAfterInterval,
  } = useTypescale()
  return (
    <VStack flex={1} align={'flex-start'}>
      <Heading as='h3'>Typescale Config</Heading>
      <NumberStepper
        label='Base Size'
        helperText='The font size used as the base for the typescale calculations.'
        initValue={size}
        onChange={(value: number) => setSize(value)}
        min={1}
        max={256} // TODO: Allow user to control
      />
      <NumberStepper
        label='Factor'
        helperText='The amount to scale each level within the typescale.'
        initValue={factor}
        onChange={(value: number) => setFactor(value)}
        step={0.125}
        precision={3}
        min={1.125}
      />
      <NumberStepper
        label='Minimum Size'
        helperText='The smallest allowable font size in the typescale.'
        initValue={minSize}
        onChange={(value: number) => setMinSize(value)}
        min={1}
        max={256} // TODO: Allow user to control
      />
      <NumberStepper
        label='Maximum Size'
        helperText='The largest allowable font size in the typescale.'
        initValue={maxSize}
        onChange={(value: number) => setMaxSize(value)}
        min={2}
        max={256} // TODO: Allow user to control
      />
      <NumberStepper
        label='Round Before By'
        helperText='The interval between sizes below the base size.'
        initValue={roundBeforeInterval}
        onChange={(value: number) => setRoundBeforeInterval(value)}
        min={1}
        max={256} // TODO: Allow user to control
      />
      <NumberStepper
        label='Round After By'
        helperText='The interval between sizes above the base size.'
        initValue={roundAfterInterval}
        onChange={(value: number) => setRoundAfterInterval(value)}
        min={1}
        max={256} // TODO: Allow user to control
      />
    </VStack>
  )
}

export default TypescaleConfig
