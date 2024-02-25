import { Heading, VStack } from '@chakra-ui/react'
import FontFamily from './FontFamily'

const Font: React.FunctionComponent = () => {
  return (
    <VStack flex={1} align={'flex-start'}>
      <Heading as='h3'>Font</Heading>
      <Heading as='h4'>Family</Heading>
      <FontFamily />
    </VStack>
  )
}

export default Font
