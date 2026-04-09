import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Only enable Fast Refresh in development mode
      // This prevents the "$RefreshSig$ is not defined" error if NODE_ENV=production is forced
      fastRefresh: mode === 'development',
    }), 
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 5173,
    }
  }
}))
