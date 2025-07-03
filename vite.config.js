import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/DW2-Controle-de-Gastos/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@firebase-config': path.resolve(__dirname, './src/firebase'),
    }
  }
})