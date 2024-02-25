import { useControllableState } from '@chakra-ui/react'
import { PropsWithChildren, createContext, useContext } from 'react'
import { TypescaleContext } from 'src/types/Typescale'

const Context = createContext<TypescaleContext>({} as TypescaleContext)

export const TypescaleProvider: React.FunctionComponent<PropsWithChildren> = (
  props
) => {
  const [baseSize, setBaseSize] = useControllableState({ defaultValue: 16 })
  const [factor, setFactor] = useControllableState({ defaultValue: 1.125 })
  const [minSize, setMinSize] = useControllableState({ defaultValue: 12 })
  const [maxSize, setMaxSize] = useControllableState({ defaultValue: 96 })
  const [roundBeforeInterval, setRoundBeforeInterval] = useControllableState({
    defaultValue: 4,
  })
  const [roundAfterInterval, setRoundAfterInterval] = useControllableState({
    defaultValue: 4,
  })
  return (
    <Context.Provider
      value={{
        baseSize,
        setBaseSize,
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
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export const useTypescale: () => TypescaleContext = () => {
  const context = useContext(Context)

  if (context === undefined || context === null) {
    throw new Error('useTypescale must be used within a TypescaleProvider')
  }

  return context
}
