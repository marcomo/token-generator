export type TypeScaleOptions = {
  baseSize: number
  factor: number
  minSize?: number
  maxSize?: number
  roundBeforeInterval?: number
  roundAfterInterval?: number
}

type Dispatch = React.Dispatch<React.SetStateAction<number>>

export type TypescaleContext = TypeScaleOptions & {
  setBaseSize: Dispatch
  setFactor: Dispatch
  setMinSize: Dispatch
  setMaxSize: Dispatch
  setRoundBeforeInterval: Dispatch
  setRoundAfterInterval: Dispatch
}
