import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("md-"),
        }
      }
    })
  ],
  base: "./",
  resolve: {
    alias: {
      "~": "/src",
    }
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 200000,
        entryFileNames: `assets/hackathon.[hash].js`,
        chunkFileNames: `assets/hackathon.[hash].js`,
        assetFileNames: `assets/hackathon.[hash].[ext]`,
        compact: true,
      },
    }
  }
})
