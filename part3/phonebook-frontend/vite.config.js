import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://fsopen-part3-backend-2.onrender.com/api/persons",
        changeOrigin: true,
      },
    }
  },
})