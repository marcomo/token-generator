import { useControllableState } from '@chakra-ui/react'
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  FontOption,
  FontState,
  FontVariant,
  FontWeightDef,
  FontsContextType,
  GoogleFont,
} from 'src/types/Font.js'

const FontsContext = createContext<FontsContextType>(null)

const getFontWeightDef: (font: GoogleFont) => FontWeightDef = (font) => {
  const weights = font.variants
    .map((variant) => {
      if (variant === 'regular') return 400
      return parseInt(variant)
    })
    .filter(Boolean)
  return {
    start: Math.min(...weights),
    end: Math.max(...weights),
  }
}

const transformFonts: (fonts: GoogleFont[]) => FontState[] = (fonts) => {
  return fonts.map<FontState>((font) => {
    let wghtAxis: FontWeightDef = font.axes?.find((axis) => axis.tag === 'wght')
    if (!wghtAxis) {
      wghtAxis = getFontWeightDef(font)
    }
    return {
      family: font.family,
      isVariable: !!font.axes,
      minWeight: wghtAxis.start,
      maxWeight: wghtAxis.end,
      defaultWeight: Math.max(wghtAxis.start, 400),
      variants: font.variants.map<FontVariant>((variant) => {
        const name = `${font.family} ${
          variant[0].toUpperCase() + variant.slice(1)
        }`
        const style = (variant === 'regular' && 'normal') || variant
        return {
          name,
          style,
        } as FontVariant
      }),
      files: font.variants.map((variant) => font.files[variant]),
    }
  })
}

export const FontsProvider: FunctionComponent<PropsWithChildren> = (props) => {
  const [fonts, setFonts] = useState<FontState[]>([])
  const [selectedFont, setSelectedFont] = useState<FontOption>()
  const [fontWeight, setFontWeight] = useControllableState<number>({
    defaultValue: 400,
  })

  // Fetch Google Fonts
  useEffect(() => {
    const getFonts = async () => {
      const params = new URLSearchParams({
        key: import.meta.env.VITE_GOOGLE_WEB_FONTS_DEVELOPER_API_KEY,
        sort: 'popularity',
      })
      const fontFamilies = [
        'Inter',
        'Lato',
        'Lora',
        'Merriweather',
        'Montserrat',
        'Nunito',
        'Open Sans',
        'Playfair Display',
        'Quicksand',
        'Raleway',
        'Roboto Flex',
        'Roboto Slab',
        'Rubik',
        'Source Sans 3',
        'Space Grotesk',
        'Work Sans',
      ]
      const fontCapabilities = ['WOFF2', 'VF']
      fontFamilies.forEach((family) => {
        params.append('family', family)
      })
      fontCapabilities.forEach((capability) => {
        params.append('capability', capability)
      })
      const response = await fetch(
        new URL(
          `/webfonts/v1/webfonts?${params.toString()}`,
          'https://www.googleapis.com'
        )
      )
      const data: { items: GoogleFont[] } = await response.json()

      const fonts = transformFonts(data.items)
      setFonts(fonts)
      setSelectedFont({
        family: fonts[0].family,
        name: fonts[0].family,
        style: '',
        isVariable: fonts[0].isVariable,
        minWeight: fonts[0].minWeight,
        maxWeight: fonts[0].maxWeight,
      })
    }
    getFonts()
  }, [])
  return (
    <FontsContext.Provider
      value={{
        fonts,
        selectedFont,
        setSelectedFont,
        fontWeight,
        setFontWeight,
      }}
    >
      {props.children}
    </FontsContext.Provider>
  )
}

export const useFonts: () => FontsContextType = () => {
  const context = useContext(FontsContext)

  if (context === undefined || context === null) {
    throw new Error('useFonts must be used within a FontsProvider')
  }

  return context
}
