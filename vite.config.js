import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://form-data-dhwk.onrender.com',
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches Netlify's Publish directory
  },

  plugins: [react()],
})
