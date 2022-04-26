import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['./src/index.tsx'],
  format: ['esm'],
  legacyOutput: true
})
