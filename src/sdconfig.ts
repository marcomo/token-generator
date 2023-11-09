import fs from 'fs'
import StyleDictionary from 'style-dictionary'

const mdfyStyleDictionary = StyleDictionary.extend({
  source: ['dist/tokens/**/*.tokens.js'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
      actions: ['logSCSS'],
    },
  },
})

mdfyStyleDictionary.registerAction({
  name: 'logSCSS',
  do: () => {
    console.log('dist/scss/_variables.scss ----------\n')
    fs.readFile('dist/scss/_variables.scss', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(data)
    })
  },
  undo: () => {
    console.log('Undo logSCSS.')
  },
})

export default mdfyStyleDictionary
