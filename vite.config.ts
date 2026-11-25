import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Конфигурация Vite: React + Tailwind CSS v4
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // доступ с других устройств в локальной сети (удобно для теста на телефоне)
    port: 5173,
  },
});
