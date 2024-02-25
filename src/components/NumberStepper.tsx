import { FunctionComponent } from 'react'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Heading from './Heading.js'

type Props = {
  label: string
  helperText: string
  initValue: number
  onChange?: (value: number) => void
} & Omit<NumberInputProps, 'onChange'>

const NumberStepper: FunctionComponent<Props> = ({
  onChange,
  initValue,
  label,
  helperText,
  ...inputProps
}) => {
  const handleChange = (_valueAsString, valueAsNumber) => {
    if (onChange) onChange(valueAsNumber)
  }
  return (
    <FormControl as='fieldset' mb={4}>
      <FormLabel mb={2}>
        <Heading as='h4'>{label}</Heading>
      </FormLabel>
      <FormHelperText>{helperText}</FormHelperText>
      <NumberInput
        defaultValue={initValue}
        display={'flex'}
        gap={4}
        onChange={handleChange}
        {...inputProps}
      >
        <NumberDecrementStepper flex='unset' border='none'>
          <IconButton
            aria-label={`decrement ${label} by ${inputProps.step}`}
            icon={<FontAwesomeIcon icon={faMinus} />}
          />
        </NumberDecrementStepper>
        <NumberInputField flex={1} />
        <NumberIncrementStepper flex='unset' border='none'>
          <IconButton
            aria-label={`increment ${label} by ${inputProps.step}`}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </NumberIncrementStepper>
      </NumberInput>
    </FormControl>
  )
}

NumberStepper.defaultProps = {
  step: 1,
}

export default NumberStepper
