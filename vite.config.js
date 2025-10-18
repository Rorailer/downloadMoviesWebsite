import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: './build', // specify your desired output folder here
    emptyOutDir: false, // optional: cleans the folder before building
  },
})
