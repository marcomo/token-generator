import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react'
import { FunctionComponent, PropsWithChildren } from 'react'

/**
 * Wrapper component of Chakra-UI Heading.
 * Applies the 'as' prop as the 'variant'.
 */

const Heading: FunctionComponent<PropsWithChildren<HeadingProps>> = ({
  as,
  ...props
}) => {
  return (
    <ChakraHeading as={as} variant={as.toString()} {...props}>
      {props.children}
    </ChakraHeading>
  )
}

export default Heading
