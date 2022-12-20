import { defineConfig, Options } from 'tsup'

const baseConfig: Options = {
  clean: true,
  format: ['esm'],
  legacyOutput: true
}

export default defineConfig([
  {
    ...baseConfig,
    minify: true,
    entry: {
      'vvmodal.prod': './src/index.tsx'
    },
    format: ['esm', 'cjs'],
    legacyOutput: true,
    dts: {
      entry: './src/index.tsx'
    },
    define: {
      __DEV__: "''"
    }
  },
  {
    ...baseConfig,
    minify: false,
    entry: {
      'vvmodal.dev': './src/index.tsx'
    },
    format: ['esm', 'cjs'],
    legacyOutput: true,
    define: {
      __DEV__: "'__DEV__'"
    }
  }
])
