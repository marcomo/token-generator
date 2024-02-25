import React from 'react'
import {
  ChakraBaseProvider,
  extendTheme,
  Card,
  Box,
  Container,
  ChakraTheme,
} from '@chakra-ui/react'
import FontStyles from './FontStyles.js'
import Typescale from './Typescale/Typescale.js'
import { FontsProvider } from 'src/context/FontsContext.js'
import Heading from './Heading.js'

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
      <FontsProvider>
        <FontStyles />
        <Container maxWidth={1600} p='64px'>
          <Box m={2} p={2}>
            <Heading as='h1' my={2}>
              Token Generator
            </Heading>
            <Typescale />
          </Box>
        </Container>
      </FontsProvider>
    </ChakraBaseProvider>
  )
}

export default App
