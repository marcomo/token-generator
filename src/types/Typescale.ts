export type TypescaleContext = {
  size: number
  setSize: React.Dispatch<React.SetStateAction<number>>
  factor: number
  setFactor: React.Dispatch<React.SetStateAction<number>>
  minSize?: number
  setMinSize: React.Dispatch<React.SetStateAction<number>>
  maxSize?: number
  setMaxSize: React.Dispatch<React.SetStateAction<number>>
  roundBeforeInterval?: number
  setRoundBeforeInterval: React.Dispatch<React.SetStateAction<number>>
  roundAfterInterval?: number
  setRoundAfterInterval: React.Dispatch<React.SetStateAction<number>>
}
