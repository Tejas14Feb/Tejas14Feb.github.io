import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { adminPlugin } from './vite-plugin-admin'

export default defineConfig({
  plugins: [react(), adminPlugin()],
})
