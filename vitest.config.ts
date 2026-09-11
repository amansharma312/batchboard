import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // Default environment for utility/logic tests (no DOM needed).
    // Component tests should add `@vitest-environment jsdom` per file
    // or override via environmentMatchGlobs when jsdom support is added.
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
