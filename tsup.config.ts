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
    define: {
      __DEV__: "'__DEV__'"
    }
  }
])
