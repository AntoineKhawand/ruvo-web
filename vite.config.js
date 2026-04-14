import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
          if (id.includes('node_modules/lenis')) {
            return 'lenis';
          }
          if (id.includes('node_modules/animejs')) {
            return 'animejs';
          }
          if (id.includes('node_modules/@heroui') || id.includes('node_modules/@nextui')) {
            return 'heroui';
          }
          if (id.includes('node_modules/react-player')) {
            return 'react-player';
          }
        },
      },
    },
  },
})
