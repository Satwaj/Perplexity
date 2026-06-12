import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser', // Aggressive minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router',
            'redux',
            '@reduxjs/toolkit',
            'react-redux'
          ],
          'utils': [
            'axios'
          ]
        }
      }
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 500,
    // CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true
  },
  server: {
    port: 5173,
    strictPort: false,
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws'
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      '@reduxjs/toolkit',
      'react-redux',
      'axios'
    ],
    exclude: ['vite-plugin-solid'] // Exclude unnecessary plugins
  }
})
