import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@components': resolve(process.cwd(), 'src/components'),
      '@hooks': resolve(process.cwd(), 'src/hooks'),
      '@store': resolve(process.cwd(), 'src/store'),
      '@types': resolve(process.cwd(), 'src/types'),
      '@utils': resolve(process.cwd(), 'src/utils'),
      '@constants': resolve(process.cwd(), 'src/constants'),
    },
  },
})
