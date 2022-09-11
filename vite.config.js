import { resolve } from 'path'
import { defineConfig} from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/board/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        edit: resolve(__dirname, 'edit/index.html')
      }
    }
  }
})
