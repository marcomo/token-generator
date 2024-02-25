import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
})
