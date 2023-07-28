import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: 'env',
  build: {
    envPrefix: 'VITE_'
  },
  server:{
    proxy:{
      '/api':{
        target: 'http://localhost:8500' ,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
