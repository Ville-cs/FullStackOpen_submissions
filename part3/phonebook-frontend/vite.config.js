import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fs-part3-backend-kdyn.onrender.com",
        changeOrigin: true,
      },
    },
  },
})
