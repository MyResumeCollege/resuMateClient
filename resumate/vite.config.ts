import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  ...(process.env.VITE_ENV !== 'dev' && { base: "http://node04.cs.colman.ac.il/public/client" }),
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
