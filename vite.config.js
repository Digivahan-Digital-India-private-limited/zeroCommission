import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api_nextpay': {
        target: 'https://zerocommissionloan.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_nextpay/, ''),
      },
      '/api_zerocom': {
        target: 'https://zerocommissionloan.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_zerocom/, ''),
      },
      '/api_base': {
        target: 'https://zerocommissionloan.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_base/, ''),
      },
    },
  },
})
