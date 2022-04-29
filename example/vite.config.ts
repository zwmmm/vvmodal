import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup')
  return {
    plugins: [
      react({
        jsxImportSource: 'theme-ui'
      }),
      mdx.default({
        jsxImportSource: 'theme-ui',
        providerImportSource: '@mdx-js/react'
      })
    ],
    optimizeDeps: {
      include: ['react/jsx-runtime']
    },
    define: {
      global: {}
    }
  }
})
