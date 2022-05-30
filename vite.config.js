import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Make sure we can do @/components/xxx style imports
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  // Enable library mode: only create ES builds
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/entry.js'),
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'axios', 'vuex', 'vue-router', '@hsorby/vue3-katex', 'katex/dist/katex.min.css', 'path-to-regexp'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps.
        // I think this is unnecessary as I am only building 'es'.
        globals: {
          axios: 'Axios',
          vue: 'Vue',
          vuex: 'Vuex',
          'vue-router': 'vue-router',
        },
      },
    },
  },
})
