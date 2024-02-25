import { Global } from '@emotion/react'
import { useFonts } from 'src/context/FontsContext.js'
/**
 * Adds styles for Google Fonts
 */
const FontStyles: React.FunctionComponent = () => {
  const { fonts } = useFonts()
  const styles = fonts?.reduce((literal, font) => {
    return `${literal}
        @font-face {
          font-family: '${font.family}';
          font-display: swap;
          font-style: normal;
          src: ${Object.keys(font.files).reduce(
            (str, key) => `${str}url('${font.files[key]}'), `,
            ''
          )};
          font-weight: ${font.minWeight} ${font.maxWeight};
        }
      `
  }, '')
  return <Global styles={styles} />
}

export default FontStyles
