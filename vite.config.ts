
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bag-over-shop/',
  server: {
    host: true,
    allowedHosts: true,
    strictPort: false,
  },
})
