import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://naseem-dentsu.github.io/ChatBot_POC_FrontEnd",
  server: {
    port: 4000
  }
})
