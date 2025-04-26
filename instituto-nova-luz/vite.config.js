import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '0432-2804-d4b-af27-9f00-50bd-13e1-a4bc-2685.ngrok-free.app'
    ]
  },
})
