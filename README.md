# Token Generator

A tool for experimenting with color and typographic tokens and generating output for use in coded implementations.

## How it works

This tool uses [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to generate tokens in target formats from an token files. This is similar to the [Style dictionary Playground](https://www.style-dictionary-play.dev/) but with the addition of an interface to generate the base tokens.

## Tokens

The `tokens` directory contains files that are compiled with `tsc` then processed by Style Dictionary to generate the target output (currently SCSS).

Style Dictionary is configured to pick up any file matching `dist/tokens/**/*.tokens.js`.

Each category of tokens uses helper functions to generate the tokens file from a configuration.

- `createTypeScale(options)` - Generates an array of font sizes from a set of options
- `createTypeScaleTokens(typeScale)` - Generates the typescale tokens input for use by Style Dictionary
- `createColorProgressionTokens(options)` - Generates the color tokens input for use by Style

## TypeScale

### `createTypeScale(options)`

#### Parameter

A `TypeScaleOptions` object

```
interface TypeScaleOptions = {
  baseSize: number
  factor: number
  minSize?: number
  maxSize?: number
  roundBeforeInterval?: number
  roundAfterInterval?: number
}
```

#### Options

- `baseSize` - The font size used as the base for the typescale calculations.
  - default: `16`
- `factor` - The amount to scale each level within the typescale.
  - default: `1.125`
- `minSize` (optional) - The smallest allowable font size in the typescale.
  - default: `12`
- `maxSize` (optional) - The largest allowable font size in the typescale.
  - default: `96`
- `roundBeforeInterval` (optional) - The interval between sizes below the base size.
  - default: `4`
- `roundAfterInterval` (optional) - The interval between sizes above the base size.
  - default: `4`

#### Returns

`number[]`

```
// Using the default options, returns
[12, 16, 20, 24, 28, 32, 36, 40, 48, 52, 60, 64, 72, 84, 92]
```

### `createTypeScaleTokens(typeScale)`

#### Parameter

`number[]`

#### Returns

A tokens object

```
// Using the default options, returns
{
  size: {
    '12': { value: '0.75rem' },
    '16': { value: '1rem' },
    '20': { value: '1.25rem' },
    '24': { value: '1.5rem' },
    '28': { value: '1.75rem' },
    '32': { value: '2rem' },
    '36': { value: '2.25rem' },
    '40': { value: '2.5rem' },
    '48': { value: '3rem' },
    '52': { value: '3.25rem' },
    '60': { value: '3.75rem' },
    '64': { value: '4rem' },
    '72': { value: '4.5rem' },
    '84': { value: '5.25rem' },
    '92': { value: '5.75rem' },
    base: { value: '{font.size.16}' }
  }
}
```

## Colors

### `createColorProgressionTokens(options)`

This function uses the [`tinycolor2`](https://github.com/bgrins/TinyColor) package to apply color adjustments and generate new colors in a progression.

#### Parameter

A `TypeScaleOptions` object

```
type ColorAdjustment =
  | number
  | number[]
  | ((levels: number[], index: number, options: BaseColorsOptions) => number)

type BaseColorsOptions = {
  baseColor: string
  baseColorIndex: number
  levelsCount: number
  baseColorKey?: string
  startLevel?: number
  levelGap?: number
  lightdark?: ColorAdjustment
  saturate?: ColorAdjustment
  desaturate?: ColorAdjustment
  spin?: ColorAdjustment
  greyscale?: boolean
  tokens?: TokenDictionary
}
```

#### Options

##### `baseColor`

The color used as the base for the color progression.

default: `#818181`

##### `baseColorIndex`

The position of the baseColor in the final progresson.

default: `3`

##### `levelsCount`

The number of colors in the progression.

default: `7`

##### `baseColorKey` (optional)

The key of the base color from which all other color keys are calcuated.

default: `'100'`

##### `startLevel` (optional)

The color level at which the progression starts.

default: `100`

##### `levelGap` (optional)

The numeric gap between color levels in the progression.

default: `100`

##### `lightdark` (optional)

The light/dark color adjustment to apply between levels. Can be a number from 0 to 100.

default: `0` (no adjustment)

Lighten and darken transformations are mutually exclusive. Otherwise they would cancel each other out. Lightening is only applied when index is less than the baseColorIndex. Darkening is only applied when index is greater than the baseColorIndex. The base color never gets transformed.

A number >= 100 will produce white for lightening and black for darkening.

Accepts:

- `number` - The adjustment is applied evenly throughout the progression.
- `number[]` - The number sharing the same index as the color level is used as the adjustment.
- `(levels, index, options) => number` - A function that returns a number. Function includes parameters
  - levels: `number[]` - The calculated level number, eg. `[100, 200, 300]`
  - index: `number` - The index of the level being adjusted.
  - options: `BaseColorOptions` - The options object passed to `createColorProgressionTokens`

##### `saturate` (optional)

The saturation color adjustment to be applied between levels. Can be a number from 0 to 100.

default: `0` (no saturation)

A number >= 100 will produce a fully saturated color.

##### `desaturate` (optional) -

The desaturation color adjustment to be applied between levels. Can be a number from 0 to 100.

default: `0` (no desaturation)

A number >= 100 will produce a fully desaturated greyscale color.

##### `spin` (optional)

The hue adjustment to be applied between levels. Can be a number from -360 to 360.

default: `0` (no hue adjustment)

The numbers 0, -360, and 360 will result in no hue adjustment being applied to the color level.

##### `greyscale`: (optional)

A boolean that, when set as `true`, will make all colors on the progression greyscale.

default: `false`

When `true`, greyscale-ing is applied after all other color adjustments and will replace the `desaturate` option.

##### `tokens` (optional)

Any manually created tokens to be added to the returned tokens object.

default: `{}`

Any token provided with a matching key will replace any generated by `createColorProgressionTokens`.

#### Returns

A tokens object

```
// This config for a blue progression
const progressionConfig = {
  baseColor: '#1157f7',
  baseColorIndex: 3,
  levelsCount: 7,
  lightdark: (levels, index, { baseColorIndex: bi }) => {
    const adjustment = (0.85 / levels.length) * 100
    return index < bi ? adjustment * (bi - index) : adjustment * (index - bi)
  },
}

// export name serves as the root key
export const color =  {
  progression: createColorProgressionTokens(progressionConfig)
}

// returns
{
  'color': {
    'progression': {
      '100': {'value': '#c6d6fc'},
      '200': {'value': '#8bacf9'},
      '300': {'value': '#5083f6'},
      '400': {'value': '#1157f7'},
      '500': {'value': '#0a41c0'},
      '600': {'value': '#072d85'},
      '700': {'value': '#04194a'}
    }
  }
}
```

```
// This config for a red progression
const redConfig = {
  baseColor: '#C63454',
  levelsCount: 3,
  baseColorIndex: 1,
  lightdark: [8, 0, 10],
  saturate: 12,
}

// Style Dictionary will merge any tokens under an existing key
export const color = {
  red: createColorProgressionTokens(redConfig)
}

// returns
{
  'color': {
    'red': {
      '100': {'value': '#d44f6c'},
      '200': {'value': '#c63454'},
      '300': {'value': '#a02742'}
    }
  }
}
```

#### How adjustments are applied

```
color
  .lighten(lightness)
  .darken(darkness)
  .spin(spin)
  .saturate(saturation)
  .desaturate(greyscale ? 100 : desaturation)
```

## Node demo script

```
npm run demo
```

This script will run a sample token generation for colors and typescale. It logs configurations, token objects, and SCSS output.

# Done/Todo

- [x] Add Typescale to UI
  - [x] Load fonts from Google
  - [x] Add font-family selector
  - [x] Add font weight slider for variable fonts
  - [x] Add font weight radio group for fixed weight fonts
  - [x] Add typscale config form
  - [x] Add typescale preview showing each font size in the scale with value and example
  - [x] add histogram of typescale to illustrate its progression
- [ ] Add color progression UI
  - [ ] Add an 'add' color button with color picker
  - [ ] Add color pregression config form
    - [ ] Add inputs for all configurable options
- [ ] Add configuration panel (showing schema of configuration as JSON)
- [ ] Add token output panel
- [ ] Add output formats selector (Sass, CSS Variables, iOS, Android)
- [ ] Add download button to download output in chosen format(s)
- [ ] Add option to save configuration
  - [ ] Add option to save to cache
  - [ ] Add option to save to file
- [ ] Add option to upload a configuration
- [ ] Give UI a proper design (Figma)
- [ ] Add tests
  - [ ] Add unit test for `createTypeScale`
  - [ ] Add unit test for `createTypeScaleTokens`
  - [ ] Add unit test for `createColorProgressionTokens`
  - [ ] Add integration tests for components
