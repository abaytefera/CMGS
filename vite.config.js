import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Map the name to the EXACT file inside node_modules
      'ethiopian-date-picker': path.resolve(__dirname, 'node_modules/ethiopian-date-picker/dist/index.js')
    }
  } 
})