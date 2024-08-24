import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  ...(process.env.VITE_ENV !== 'dev' && { base: "http://10.10.248.116/public/client" }),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    modules: {}
  }
})
