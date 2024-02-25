export type FontWeightDef = {
  start: number
  end: number
}
export type GoogleFont = {
  family: string
  files: Record<string, string>
  variants: ('regular' | 'italic')[]
  axes?: ({
    tag: 'wght'
  } & FontWeightDef)[]
}
export type FontOption = FontVariant &
  Pick<FontState, 'family' | 'minWeight' | 'maxWeight' | 'isVariable'>
export type FontVariant = {
  name: string
  style: string
}
export type FontState = {
  family: string
  isVariable: boolean
  minWeight: number
  maxWeight: number
  defaultWeight: number
  files?: string[]
  variants: FontVariant[]
}
export type FontsContextType = {
  fonts: FontState[]
  selectedFont: FontOption
  setSelectedFont: React.Dispatch<React.SetStateAction<FontOption>>
  fontWeight: number
  setFontWeight: React.Dispatch<React.SetStateAction<number>>
}
