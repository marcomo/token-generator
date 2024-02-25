import { Box, Card, Flex } from '@chakra-ui/react'
import { useFonts } from '../../context/FontsContext.js'
import { useTypescale } from 'src/context/TypescaleContext.js'
import createTypescale from 'src/utils/createTypeScale.js'
import Heading from '../Heading.js'

const Results: React.FunctionComponent = () => {
  const {
    baseSize,
    factor,
    minSize,
    maxSize,
    roundBeforeInterval,
    roundAfterInterval,
  } = useTypescale()
  const { selectedFont, fontWeight } = useFonts()
  const typescale = createTypescale({
    baseSize,
    factor,
    minSize,
    maxSize,
    roundBeforeInterval,
    roundAfterInterval,
  })
  return (
    <>
      <Flex align={'baseline'} justify={'space-between'}>
        <Heading as='h2' mb={2}>
          Results
        </Heading>
        <Flex h={8} gap={2} align={'flex-end'}>
          {typescale.map((size) => (
            <Box
              key={`font-size-${size}`}
              h={`${(size / typescale[typescale.length - 1]) * 100}%`}
              bgColor={'green.200'}
              flex={1}
              minW='.25rem'
            ></Box>
          ))}
        </Flex>
      </Flex>
      <Flex gap={4} mb={8} wrap='wrap'>
        {typescale.map((size, i) => {
          return (
            <Card
              p={4}
              flex='1 0 auto'
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-around'}
              gap={4}
              key={`${size}-${i}`}
            >
              {size}px
              <Flex
                flex={1}
                alignItems='end'
                as='span'
                lineHeight='0.85em'
                style={{
                  fontSize: size,
                  fontWeight: fontWeight,
                  fontFamily: `'${selectedFont?.family}'`,
                }}
              >
                Aa
              </Flex>
            </Card>
          )
        })}
      </Flex>
    </>
  )
}

export default Results
