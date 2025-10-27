import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// Add this to get __dirname support in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Updated to modern object syntax for aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/entry.js'), // Make sure this path is correct
      name: 'Vue3SphinxXml', // The global variable name for the UMD build
      formats: ['es', 'umd'], // Build both ES and UMD
      fileName: (format) => `vue3-sphinx-xml.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      // Externalize all your peer dependencies and other libraries
      external: [
        'vue',
        'vue-router',
        'pinia',
        'katex',
        'katex/dist/katex.min.css',
        'vue3-katex',
        '@hsorby/vue3-highlightjs',
      ],
      output: {
        // Provide global variable names for the UMD build
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          katex: 'katex',
          'vue3-katex': 'Vue3Katex',
          '@hsorby/vue3-highlightjs': 'Vue3Highlightjs',
        },
      },
    },
  },
})