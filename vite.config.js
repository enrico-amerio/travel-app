import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // Configura il percorso base per il tuo progetto
  build: {
    outDir: 'dist', // Directory di output per i file di build
  },
  server: {
    historyApiFallback: true // Gestisce il routing lato client in sviluppo
  }
})