import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Konfigurasi Vite untuk React + proxy ke backend Express
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 🟢 agar bisa diakses dari jaringan LAN (bukan cuma localhost)
    port: 1113, // 🟢 port frontend kamu (bebas asal tidak bentrok)
    open: true, // opsional, auto buka browser pas npm run dev
    proxy: {
      '/api': {
        // 🟢 ganti target ke IP server backend di LAN kamu
        target: 'http://192.168.10.106:1311',
        changeOrigin: true,
        secure: false, // 🟢 kalau backend pakai http (bukan https)
      },
    },
  },
})
