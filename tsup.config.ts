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
      'ukyou.prod': './src/index.tsx'
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
      'ukyou.dev': './src/index.tsx'
    },
    define: {
      __DEV__: "'__DEV__'"
    }
  }
])
