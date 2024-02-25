import {
  Radio,
  Stack,
  Text,
  UseRadioProps,
  useRadio,
  useRadioGroup,
  Wrap,
  Tag,
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'

type Option = {
  value: string
  label: string
  selected: boolean
  data?: Record<string, string>
}

type Props = {
  options: Option[]
  handleChange: UseRadioProps['onChange']
  heading?: string
}

const RadioGroup: FunctionComponent<Props> = (props) => {
  const CustomRadio: FunctionComponent<{ item: Option } & UseRadioProps> = ({
    item,
    ...props
  }) => {
    const { state, getInputProps, getRadioProps, getLabelProps } =
      useRadio(props)
    return (
      <Radio
        isChecked={state.isChecked}
        {...getRadioProps()}
        {...getLabelProps()}
        value={item.value}
        inputProps={{
          ...getInputProps(),
          ...item.data,
        }}
        hidden
      >
        <Tag
          bg={state.isChecked || item.selected ? 'green.200' : 'gray.100'}
          rounded='full'
          py={2}
          px={4}
        >
          {item.label}
        </Tag>
      </Radio>
    )
  }

  const { getRadioProps, getRootProps, setValue } = useRadioGroup()

  const handleChange: UseRadioProps['onChange'] = (selected) => {
    // changes UI immediately
    setValue(selected.target.value)
    // calls handler prop for outside reactions
    props.handleChange(selected)
  }

  return (
    <Stack {...getRootProps()}>
      {props.heading ? <Text as='h3'>{props.heading}</Text> : null}
      <Wrap>
        {props.options?.map((item, i) => {
          return (
            <CustomRadio
              key={`${item.value}-${i}`}
              {...getRadioProps({ value: item.value })}
              onChange={handleChange}
              item={item}
            />
          )
        })}
      </Wrap>
    </Stack>
  )
}

export default RadioGroup
