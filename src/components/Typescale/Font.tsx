import { Heading, VStack } from '@chakra-ui/react'
import FontFamily from './FontFamily'
import FontWeight from './FontWeight'

const Font: React.FunctionComponent = () => {
  return (
    <VStack flex={1} align={'flex-start'}>
      <Heading as='h3'>Font</Heading>
      <Heading as='h4'>Family</Heading>
      <FontFamily />
      <Heading as='h4'>Weight</Heading>
      <FontWeight />
    </VStack>
  )
}

export default Font
