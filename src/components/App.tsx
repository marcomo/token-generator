import React from 'react'
import {
  ChakraBaseProvider,
  extendTheme,
  Card,
  Box,
  Container,
  Heading,
  ChakraTheme,
} from '@chakra-ui/react'

const customTheme: Partial<ChakraTheme> = {
  components: {
    Heading: {
      variants: {
        h1: {
          fontSize: '4xl',
        },
        h2: {
          fontSize: '3xl',
        },
        h3: {
          fontSize: '2xl',
        },
        h4: {
          fontSize: 'xl',
        },
      },
    },
  },
}

const theme = extendTheme(customTheme)

const App: React.FunctionComponent = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <Container maxWidth={1600} p='64px'>
        This is a Container
        <Box m={2} p={2}>
          This is a box
          <Heading as='h1'>Token Generator</Heading>
          <Card p={4}>This is a card</Card>
        </Box>
      </Container>
    </ChakraBaseProvider>
  )
}

export default App
