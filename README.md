# Token Generator

A tool for experimenting with color and typographic tokens and generating output for use in coded implementations.

> :construction: This is a work-in-progress project. See the [Todos](#donetodo) list for what's done and what's to come.

## How it works

This tool uses [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to generate tokens in target formats from token files. This is similar to the [Style dictionary Playground](https://www.style-dictionary-play.dev/) but with the addition of an interface to generate the base tokens.

## Tokens

The `tokens` directory contains files that are compiled with `tsc` then processed by Style Dictionary to generate the target output (currently SCSS).

Style Dictionary is configured to pick up any file matching `dist/tokens/**/*.tokens.js`.

Each category of tokens uses helper functions to generate the tokens file from a configuration.

- `createTypeScale(options)` - Generates an array of font sizes from a set of options
- `createTypeScaleTokens(typeScale)` - Generates the typescale tokens input for use by Style Dictionary
- `createColorProgressionTokens(options)` - Generates the color tokens input for use by Style Dictionary

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

##### `baseSize` (required)

The font size used as the base for the typescale calculations.

###### Default

`16`

###### Additional details

The `baseSize` is not necessarily the first size in the progression. You can have a `minSize` lower than the `baseSize` which will result in typescale sizes lower than the `baseSize`.

The `baseSize` will always be within the typescale.

##### `factor` (required)

The amount to scale each level within the typescale.

###### Default

`1.125`

###### Additional details

The `factor` is use to calculate the next font size in the typescale.

```
  nextFontSize = previousFontSize * factor
```

##### `minSize`

The smallest allowable font size in the typescale.

###### Default

`12`

###### Additional details

The `minSize` is not guaranteed to be in the final typescale. The `factor` and `roundBeforeInterval` may cause it to not be included.

```
// This config will not include the minSize in the typescale
{
  baseSize: 20,
  factor: 1.25,
  minSize: 12,
  maxSize: 72,
  roundBeforeInterval: 8,
  roundAfterInterval: 8
}

// results in typescale
[16, 20, 24, 32, 40, 48, 64]
```

##### `maxSize`

The largest allowable font size in the typescale.

###### Default

`96`

###### Additional details

The `maxSize` is not guaranteed to be in the final typescale. The `factor` and `roundAfterInterval` may cause it to not be included.

In the example above for `minSize`, the `maxSize` is not included in final typescale.

##### `roundBeforeInterval`

The interval between sizes below the base size.

###### Default

`4`

###### IAdditional detailsfo

When the `factor` is applied, it will likely generate a float. For example,

```
// This config
{
  baseSize: 16,
  factor: 1.25,
  minSize: 12,
  maxSize: 72,
  roundBeforeInterval: 4,
  roundAfterInterval: 8
}

  // returns this typescale without rounding
  [
    // 4 values prior
    11.24, 12.64, 14.22,
    // baseSize
    16,
    // 13 values prior
    18, 20.25, 22.78, 25.63,
    28.83, 32.43, 36.48, 41.04,
    46.17, 51.94, 58.43, 65.73,
    73.95
  ]
```

Rounding is applied to give us whole integer font sizes. `roundBeforeInterval` controls the rounding of numbers prior to the `baseSize`. After rounding, the final typescale is shorter:

```
[
  // 1 value prior
  12,
  // baseSize
  16,
  // 7 values after
  24, 32, 40, 48, 56, 64, 72
]
```

##### `roundAfterInterval`

The interval between sizes above the base size.

###### Default

`4`

###### Additional details

`roundBeforeInterval` controls the rounding of numbers prior to the `baseSize`.

See the example above in `roundBeforeInterval` to see how rounding is applied.

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

A `BaseColorsOptions` object

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

##### `baseColor` (required)

The color used as the base for the color progression.

Accepted colors: hex, 8-digit hex, rgb(a), hsl(a), hsv(a), or named color. rgb(a), hsl(a), hsv(a) accept object input.

##### `baseColorIndex` (required)

The position of the baseColor in the final progresson.

##### `levelsCount` (required)

The number of colors in the progression.

##### `baseColorKey`

A key to use for the base color in place of the key generated from the level. For example,

```
export const color = {
  neutral: createColorProgressionTokens({
    baseColor: '#4b5055',
    baseColorIndex: 6,
    baseColorKey: 'dark',
    levelsCount: 7,
    lightdark: [64, 56, 48, 24, 16, 8, 0],
  }),
}

// returns
{
  color: {
    neutral: {
      '100': { value: '#f2f3f4' },
      '200': { value: '#dddfe1' },
      '300': { value: '#c7cace' },
      '400': { value: '#868d94' },
      '500': { value: '#717980' },
      '600': { value: '#5e646b' },
      'dark': { value: '#4b5055' }
    }
  }
}
```

##### `startLevel`

The color level at which the progression starts.

###### Default

`100`

##### `levelGap`

The numeric gap between color levels in the progression.

###### Default

`100`

###### Additional details

```
export const color = {
  neutral: createColorProgressionTokens({
    baseColor: '#4b5055',
    baseColorIndex: 6,
    levelGap: 10,
    startLevel: 10,
    levelsCount: 7,
    lightdark: [64, 56, 48, 24, 16, 8, 0],
  }),
}

// returns
{
  color: {
    neutral: {
      '10': { value: '#f2f3f4' },
      '20': { value: '#dddfe1' },
      '30': { value: '#c7cace' },
      '40': { value: '#868d94' },
      '50': { value: '#717980' },
      '60': { value: '#5e646b' },
      '70': { value: '#4b5055' }
    }
  }
}
```

##### `lightdark`

The light/dark color adjustment to apply between levels. Can be a number from 0 to 100.

###### Default

`0` (no adjustment)

###### Additional details

Lighten and darken transformations are mutually exclusive. Otherwise they would cancel each other out. Lightening is only applied when the color's index is less than the `baseColorIndex`. Darkening is only applied when the color's index is greater than the `baseColorIndex`. The base color never gets transformed.

A number >= 100 will produce white for lightening and black for darkening.

###### Acceptable argument types

`number`

The adjustment is applied evenly throughout the progression.

`number[]`

The number sharing the same index as the color level is used as the adjustment.

`(levels, index, options) => number`

A function that returns a number. Function includes parameters

- levels: `number[]` - The calculated level number, eg. `[100, 200, 300]`
- index: `number` - The index of the level being adjusted.
- options: `BaseColorOptions` - The options object passed to `createColorProgressionTokens`

##### `saturate`

The saturation color adjustment to be applied between levels. Can be a number from 0 to 100.

###### Default

`0` (no saturation)

###### Additional details

A number >= 100 will produce a fully saturated color.

##### `desaturate`

The desaturation color adjustment to be applied between levels. Can be a number from 0 to 100.

###### Default

`0` (no desaturation)

###### Additional details

A number >= 100 will produce a fully desaturated greyscale color.

##### `spin`

The hue adjustment to be applied between levels. Can be a number from -360 to 360.

###### Default

`0` (no hue adjustment)

###### Additional details

The numbers 0, -360, and 360 will result in no hue adjustment being applied to the color level.

##### `greyscale`

A boolean that, when set as `true`, will make all colors on the progression greyscale.

###### Default

`false`

###### Additional details

When `true`, greyscale-ing is applied after all other color adjustments and will replace the `desaturate` option.

##### `tokens`

Any manually created tokens to be added to the returned tokens object.

###### Default

`{}`

###### Additional details

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
