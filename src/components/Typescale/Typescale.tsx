import { Box, Card, Flex, HStack, Heading, Text } from '@chakra-ui/react'
import Font from './Font'

const Typescale: React.FunctionComponent = () => {
  return (
    <Card p={16}>
      <Flex direction={'column'} gap={4}>
        <Box mb={2}>
          <Heading as='h2'>Create a Typescale</Heading>
          <Text>Typescale instructions</Text>
        </Box>
        <HStack gap={16} align={'flex-start'}>
          <Font />
        </HStack>
      </Flex>
    </Card>
  )
}

export default Typescale
