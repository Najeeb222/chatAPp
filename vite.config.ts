import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        context: path.resolve(__dirname, 'src/context'),
        services: path.resolve(__dirname, 'src/services'),
        constant: path.resolve(__dirname, 'src/constant'),
        utils: path.resolve(__dirname, 'src/utils'),
        libs: path.resolve(__dirname, 'src/libs'),
        hocs: path.resolve(__dirname, 'src/hocs'),
        features: path.resolve(__dirname, 'src/features'),
        layout: path.resolve(__dirname, 'src/layout'),
        collections: path.resolve(__dirname, 'src/collections'),
        styles: path.resolve(__dirname, 'src/styles'),
        screens: path.resolve(__dirname, 'src/screens'),
        validations: path.resolve(__dirname, 'src/validations'),
        core: path.resolve(__dirname, 'src/core'),
        assets: path.resolve(__dirname, 'public/assets'),
      },
    },
  
  }
})
