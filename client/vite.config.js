import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/


export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      '4ec2-2402-800-629d-2ac3-1843-bafc-47c3-6513.ngrok-free.app' // 👈 dùng đúng domain ngrok thật
    ]
  }
})